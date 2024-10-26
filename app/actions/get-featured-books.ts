"use server";
import { cache } from "react";
import { getFeaturedBooks as fetchFeaturedBooks } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

const getFeaturedBooks = cache(async () => {

  const supabase = createClient();

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
