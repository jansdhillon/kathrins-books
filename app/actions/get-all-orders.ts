"use server";
import { getAllOrdersWithOrderItems } from "@/utils/supabase/queries";
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

const getAllOrders = cache(async (supabase: SupabaseClient) => {
  const { data: orders, error } = await getAllOrdersWithOrderItems(supabase);

  if (error) {
    console.error("Error fetching books:", error.message);
  }

  if (!orders) {
    return [];
  }

  return orders;
});

export { getAllOrders };
