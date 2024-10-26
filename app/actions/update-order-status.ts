"use server";
import { updateOrderStatus as update } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

const updateOrderStatus = async (orderId: string, status: string) => {
  const supabase = createClient();
  const { error } = await update(supabase, orderId, status);

  if (error) {
    console.error("Error fetching books:", error.message);
  } else {
    console.log("Order status updated successfully");
  }

  return { error };
};

export { updateOrderStatus };
