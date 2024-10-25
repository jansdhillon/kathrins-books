"use server";
import { getAllBooks as fetchBooks } from "@/utils/supabase/queries";
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

const getAllBooks = cache(async (supabase: SupabaseClient) => {
  const { data: books, error } = await fetchBooks(supabase);

  if (error) {
    console.error("Error fetching books:", error.message);
  }

  if (!books) {
    return [];
  }

  return books;
});

export { getAllBooks };
