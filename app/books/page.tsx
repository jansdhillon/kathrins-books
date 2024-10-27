import { BookPage } from "@/app/books/components/book-page";
import { getAllBooks } from "../actions/get-all-books";

export default async function AllBooksPage() {
  const allBooks = await getAllBooks();
  return (
    <BookPage
      books={allBooks}
      title="Books"
      subtitle="Explore the entire collection of books."
    />
  );
}
