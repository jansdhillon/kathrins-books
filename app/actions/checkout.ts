"use server";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { fixOneToOne } from "../fixOneToOne";
import { stripe } from "@/utils/stripe/config";
import { Database } from "@/utils/database.types";

export const checkoutAction = async () => {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return encodedRedirect(
        "error",
        "/sign-in",
        "You must be signed in to checkout."
      );
    }

    const userId = user.id;

    // Get the user's cart
    const { data: cart, error: cartError } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (cartError || !cart) {
      console.error("Error fetching cart:", cartError?.message);
      return encodedRedirect("error", "/cart", "Your cart is empty.");
    }

    // Get cart items with book details
    const { data: cartItems, error: cartItemsError } = await supabase
      .from("cart_items")
      .select("id, quantity, book:books(id, price, title)")
      .eq("cart_id", cart.id)

    if (cartItemsError || !cartItems || cartItems.length === 0) {
      console.error("Error fetching cart items:", cartItemsError?.message);
      return encodedRedirect("error", "/cart", "Your cart is empty.");
    }

    // Calculate total amount
    const amount = cartItems.reduce((total, item) => {
      return total + item.quantity * fixOneToOne(item?.book)?.price;
    }, 0);

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "cad",
      metadata: {
        user_id: userId,
      },
    });

    // Create an order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        payment_intent_id: paymentIntent.id,
      })
      .select("*")
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError.message);
      return encodedRedirect("error", "/cart", "Failed to create order.");
    }


    const orderItemsData = cartItems.map((item) => ({
      order_id: order.id,
      book_id: fixOneToOne(item.book)?.id,
      quantity: item.quantity,
      price: fixOneToOne(item?.book)?.price,
    }));

    const { error: orderItemsError } = await supabase.from("order_items").insert(orderItemsData);

    if (orderItemsError) {
      console.error("Error creating order items:", orderItemsError.message);
      return encodedRedirect("error", "/cart", "Failed to process order items.");
    }

    // Clear the cart
    const { error: clearCartError } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id);

    if (clearCartError) {
      console.error("Error clearing cart:", clearCartError.message);
      return encodedRedirect("error", "/cart", "Failed to clear cart.");
    }

    // Store payment information in the payments table
    const paymentData: Database["public"]["Tables"]["payments"]["Insert"] = {
      order_id: order.id,
      payment_intent_id: paymentIntent.id,
      amount: amount,
      currency: "CAD",
      status: paymentIntent.status,
    };

    const { error: paymentError } = await supabase.from("payments").insert(paymentData);

    if (paymentError) {
      console.error("Error storing payment info:", paymentError.message);
      return encodedRedirect("error", "/cart", "Failed to store payment information.");
    }

    return { clientSecret: paymentIntent.client_secret, dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`}

  };