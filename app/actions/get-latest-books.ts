"use server";
import { getLatestBooks as fetchLatestBooks } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

const getLatestBooks = cache(async () => {
  const supabase = createClient();
  const { data: books, error } = await fetchLatestBooks(supabase);

  if (error) {
    console.error("Error fetching books:", error.message);
  }

  if (!books) {
    return [];
  }

  return books;
});

export { getLatestBooks };
