"use server";
import { createClient } from "@/utils/supabase/server";
import { OrderType } from "@/lib/types/types";

export const updateOrderStatus = async (
  orderId: string,
  status: "Delivered" | "Shipped" | "Ordered" | "Failed" | "pending" | null | undefined,
  trackingNumber?: string,
  shippingProvider?: string
) => {
  const supabase = createClient();

  const updates: Partial<OrderType> = { status };

  if (status === "Shipped") {
    updates.tracking_number = trackingNumber;
    updates.shipping_provider = shippingProvider;
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", orderId);

  if (error) {
    throw error;
  }

  return data;
};
