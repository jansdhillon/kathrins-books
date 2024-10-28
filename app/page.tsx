import { getFeaturedBooks } from "./actions/get-featured-books";
import BookDisplay from "@/app/books/components/book-display";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import BgGlowContainer from "@/components/bg-glow-container";
import { getLatestBooks } from "./actions/get-latest-books";
import { Book } from "@/app/books/components/book";
import { BookType } from "@/lib/types/types";

const FeaturedBooks = ({ featuredBooks }: { featuredBooks: BookType[] }) => {
  return (
    <section className=" flex flex-col md:flex-row items-center  py-8 ">
      <div className="flex flex-col space-y-6 w-full justify-center container lg:my-0 pr-8 ">
        <div className="space-y-6  ">
          <h2 className="text-xl font-bold" id="featured">
            Featured
          </h2>
          <p className="text-base mb-6 text-muted-foreground font-semibold">
            Handpicked by Kathrin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 justify-center max-w-7xl  ">
          {featuredBooks.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default async function HomePage() {
  const latestBooks = await getLatestBooks();
  const featuredBooks = await getFeaturedBooks();

  return (
    <div className="flex flex-col justify-center h-full -mt-5">
      <BgGlowContainer>
        <div className="flex flex-col gap-4 container lg:my-0  items-start text-left text-primary  mx-auto leading-loose -pt-8 ">
          <div className="text-4xl md:text-5xl font-extrabold text-left ">
            Find Your Next
            <br /> Great Read.
          </div>
          <p className="text-base md:text-xl md:max-w-[50%] font-medium  leading-loose">
            Discover a curated selection of rare books. From classics to
            lifestyle books and modern novels,{" "}
            <span className="font-bold">Kathrin&apos;s Books</span> has
            something for every reader.
          </p>
          <Link href="/books">
            <Button className="flex items-center space-x-2 z-30 font-bold">
              Browse Books
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </BgGlowContainer>

      <FeaturedBooks featuredBooks={featuredBooks} />

      <section className="space-y-6 py-8 flex flex-col md:flex-row items-center gap-4  bg-secondary dark:bg-secondary/50 -mb-10  ">
        <div className="flex flex-col space-y-6 w-full justify-center   md:my-0  ">
          <div className="space-y-6  mx-auto container">
            <h2 className="text-xl font-bold">Latest Books</h2>
            <p className="text-base mb-6 text-muted-foreground font-semibold ">
              Just listed.
            </p>
          </div>
          <div className=" w-full ">
            <BookDisplay books={latestBooks} />
          </div>
          <Link
            href="/books"
            className="flex items-center justify-center w-full  "
          >
            <Button className="flex items-center justify-center space-x-2 font-bold my-4">
              <span>View All Books</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
