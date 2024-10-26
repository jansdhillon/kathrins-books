"use server";
import { getAllOrdersWithOrderItems } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

const getAllOrders = cache(async () => {
  const supabase = createClient();
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
