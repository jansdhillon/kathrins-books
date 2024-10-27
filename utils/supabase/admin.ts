import { stripe } from "@/utils/stripe/config";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import type { Database } from "../database.types";
import { createOrder, getOrCreateCart } from "./queries";
import {
  OrderItemInsertType,
  PriceType,
  ProductType,
  Address,
} from "@/lib/types/types";
import { sendEmail } from "@/app/actions/send-email";
import { ShippingAddress } from "@stripe/stripe-js";

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const upsertProductRecord = async (product: Stripe.Product) => {
  const { data: book } = await supabaseAdmin
    .from("books")
    .select("*")
    .eq("id", product.metadata.bookId)
    .single();

  const productData: ProductType = {
    id: product.id,
    book_id: book?.id!,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };

  const { error: upsertError } = await supabaseAdmin
    .from("products")
    .upsert([productData]);
  if (upsertError)
    throw new Error(`Product insert/update failed: ${upsertError.message}`);
};

const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
) => {
  const priceData: PriceType = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    unit_amount: price.unit_amount ?? null,
    description: price.nickname ?? null,
    metadata: price.metadata,
    type: "one_time",
  };

  const { error: upsertError } = await supabaseAdmin
    .from("prices")
    .upsert([priceData]);

  if (upsertError?.message.includes("foreign key constraint")) {
    if (retryCount < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await upsertPriceRecord(price, retryCount + 1, maxRetries);
    } else {
      throw new Error(
        `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`
      );
    }
  } else if (upsertError) {
    throw new Error(`Price insert/update failed: ${upsertError.message}`);
  }
};

const deleteProductRecord = async (productId: string) => {
  await stripe.products.update(productId, { active: false });
  const { error: deletionError } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", productId);
  if (deletionError)
    throw new Error(`Product deletion failed: ${deletionError.message}`);
};

const deletePriceRecord = async (priceId: string) => {
  await stripe.prices.update(priceId, { active: false });
  const { error: deletionError } = await supabaseAdmin
    .from("prices")
    .delete()
    .eq("id", priceId);
  if (deletionError)
    throw new Error(`Price deletion failed: ${deletionError.message}`);
};

const deleteOrderRecord = async (orderId: string) => {
  const { error: deletionError } = await supabaseAdmin
    .from("orders")
    .delete()
    .eq("id", orderId);
  if (deletionError)
    throw new Error(`Order deletion failed: ${deletionError.message}`);
};

const deleteOrderItemsRecord = async (orderId: string) => {
  const { error: deletionError } = await supabaseAdmin
    .from("order_items")
    .delete()
    .eq("order_id", orderId);
  if (deletionError)
    throw new Error(`Order Items deletion failed: ${deletionError.message}`);
};

const addBillingDetailsToOrder = async (orderId: string, address: Address) => {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ address: address })
    .eq("id", orderId);

  if (error) {
    throw new Error(`Error updating user metadata: ${error.message}`);
  }
};

const placeOrder = async (session: Stripe.Checkout.Session) => {
  const sessionId = session.id;
  const userId = session?.metadata?.userId;
  const total = session.amount_total ?? 0;
  const shippingCost = session.total_details?.amount_shipping ?? 0;
  const itemsTotal = total - shippingCost;

  if (!userId) {
    throw new Error("User ID not found in session metadata");
  }

  const { data: order, error: orderError } = await createOrder(
    supabaseAdmin,
    userId,
    sessionId,
    itemsTotal,
    shippingCost
  );

  if (orderError) {
    throw new Error(`Error creating order: ${orderError.message}`);
  }

  const { data: cartDetails, error: cartError } = await getOrCreateCart(
    supabaseAdmin,
    userId
  );

  if (cartError) {
    throw cartError;
  }

  const orderItemsData = cartDetails.cart_items.map((item: any) => ({
    order_id: order.id!,
    book_id: item.book.id,
    book_title: item.book.title,
    book_author: item.book.author,
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.price,
    image_directory: item.book.image_directory,
  })) as OrderItemInsertType[];

  const { error: orderItemsError } = await supabaseAdmin
    .from("order_items")
    .insert(orderItemsData);

  if (orderItemsError) {
    throw orderItemsError;
  }

  return {
    order: order,
    orderItemsData: orderItemsData,
    itemsTotal: itemsTotal,
    shippingCost: shippingCost,
  };
};

async function reduceStock(orderItemsData: OrderItemInsertType[]) {
  for (const item of orderItemsData) {
    const { data: bookData, error: bookFetchError } = await supabaseAdmin
      .from("books")
      .select("stock")
      .eq("id", item.book_id)
      .single();

    if (bookFetchError) {
      console.error(
        `Error fetching stock for book ID ${item.book_id}:`,
        bookFetchError.message
      );
      continue;
    }

    const newStock = (bookData?.stock ?? 0) - item.quantity;

    const { error: stockUpdateError } = await supabaseAdmin
      .from("books")
      .update({ stock: newStock })
      .eq("id", item.book_id);

    if (stockUpdateError) {
      console.error(
        `Error reducing stock for book ID ${item.book_id}:`,
        stockUpdateError.message
      );
      throw new Error("Error reducing stock for book.");
    }
  }
}

async function clearCart(userId: string) {
  const { data: cartData, error: cartFetchError } = await supabaseAdmin
    .from("cart")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (cartFetchError || !cartData) {
    console.error("Error fetching cart data:", cartFetchError?.message);
    throw new Error("Error fetching cart data.");
  }

  const cartId = cartData.id;

  const { error: cartClearError } = await supabaseAdmin
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (cartClearError) {
    console.error("Error clearing cart items:", cartClearError.message);
    throw new Error("Error clearing cart items.");
  }
}

async function handleCheckoutSucceeded(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.userId;

    if (!userId) throw new Error("User ID not found in session metadata");

    const { data: customerData, error: customerError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (customerError) {
      throw new Error(`Error fetching user data: ${customerError.message}`);
    }

    const { name: name, address: address } =
      session.shipping_details as Stripe.Checkout.Session.ShippingDetails;

    if (
      !address ||
      !name ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.postal_code ||
      !address.country
    ) {
      throw new Error("Shipping address not found in session metadata");
    }

    const formattedAddress: Address = {
      name: name,
      email: customerData.user?.email!,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
    };

    await addBillingDetailsToOrder(session.id, formattedAddress);

    const { order, orderItemsData, itemsTotal, shippingCost } =
      await placeOrder(session);

    await sendEmail(
      {
        name:
          customerData.user?.user_metadata?.full_name ||
          customerData.user?.user_metadata?.display_name,
        email: customerData.user?.email!,
        orderId: order.id,
        orderItems: orderItemsData,
        itemsTotal,
        shippingCost,
        address: formattedAddress,
      },
      "order-confirmation"
    );

    await sendEmail(
      {
        name: "Kathrin",
        email: process.env.ADMIN_EMAIL!,
        orderId: order.id,
        orderItems: orderItemsData,
        itemsTotal,
        shippingCost,
        address: formattedAddress,
      },
      "kathrin-notification"
    );

    await reduceStock(orderItemsData);
    await clearCart(userId);
  } catch (error: any) {
    console.error("Error in handleCheckoutSucceeded:", error?.message);
  }
}

export {
  upsertProductRecord,
  upsertPriceRecord,
  deleteProductRecord,
  deletePriceRecord,
  deleteOrderRecord,
  deleteOrderItemsRecord,
  handleCheckoutSucceeded,
};
