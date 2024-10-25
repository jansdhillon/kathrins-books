import { BookPage } from "@/app/books/components/book-page";
import { getAllBooks } from "../actions/get-all-books";
import { createClient } from "@/utils/supabase/server";

export default async function AllBooksPage() {
  const supabase = createClient();
  const allBooks = await getAllBooks(supabase);
  return (
    <BookPage
      books={allBooks}
      title="All Books"
      subtitle="Explore the entire collection of books."
    />
  );
}
