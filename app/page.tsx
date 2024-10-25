import { getFeaturedBooks } from "./actions/get-featured-books";
import BookDisplay from "@/app/books/components/book-display";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import BgGlowContainer from "@/components/bg-glow-container";
import { getAllBooks } from "./actions/get-all-books";
import { Book } from "@/app/books/components/book";
import { BookType } from "@/lib/types/types";
import { createClient } from "@/utils/supabase/server";

const FeaturedBooks = ({ featuredBooks }: { featuredBooks: BookType[] }) => {
  return (
    <section className="space-y-6 p-8 flex flex-col md:flex-row items-center gap-8 -mt-8 ">
    <div className="flex flex-col space-y-6 lg:container lg:justify-center ">
        <h2 className="text-xl font-bold" id="featured">
          Featured
        </h2>

        <p className="text-base mb-6 text-muted-foreground font-medium">
          Handpicked by Kathrin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 justify-center ">
          {featuredBooks.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default async function HomePage() {
  const supabase = await createClient();
  const allBooks = await getAllBooks(supabase);
  const featuredBooks = await getFeaturedBooks(supabase);

  return (
    <div className="flex flex-col justify-center h-full gap-8 -mt-14">
      <BgGlowContainer>
        <div className="flex flex-col gap-6 container mx-auto justify-between items-start text-left text-primary py-32  leading-loose">
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

      <section className="space-y-6 p-8 flex flex-col md:flex-row items-center gap-8  bg-secondary dark:bg-accent/40  ">
        <div className="flex flex-col space-y-6 container justify-center ">
          <h2 className="text-xl font-bold">Latest Books</h2>

          <p className="text-base mb-6 text-muted-foreground font-medium">
            Just listed.
          </p>
          <BookDisplay books={allBooks} />

          <Link
            href="/books"
            className="flex items-center justify-center w-full  "
          >
            <Button className="flex items-center justify-center space-x-2 font-bold">
              <span>View All Books</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </section>

      <section className="px-8 flex flex-col md:flex-row items-center gap-8 ">

      <div className="flex flex-col space-y-6 container justify-center ">
          <h2 className="text-xl font-bold">About</h2>
          <p className="font-medium text-muted-foreground md:max-w-[50%]">
            Kathrin is a passionate book lover and curator who believes in the
            transformative power of literature. With over a decade of experience
            as a book collector, she has a keen eye for hidden gems and timeless
            classics.
          </p>
          <p className="font-medium text-muted-foreground md:max-w-[50%]">
            Her mission is to connect readers with books that inspire, educate,
            and entertain. Every book in Kathrin's collection is handpicked,
            ensuring quality and diversity across genres.
          </p>
        </div>
      </section>
    </div>
  );
}
