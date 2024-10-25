"use server";
import { cache } from "react";
import { getFeaturedBooks as fetchFeaturedBooks } from "@/utils/supabase/queries";
import { SupabaseClient } from "@supabase/supabase-js";

const getFeaturedBooks = cache(async (supabase: SupabaseClient) => {


  const { data: books, error } = await fetchFeaturedBooks(supabase);

  if (error) {
    console.error("Error fetching featured books:", error.message);
  }

  if (!books) {
    return [];
  }

  return books;
});

export { getFeaturedBooks };
