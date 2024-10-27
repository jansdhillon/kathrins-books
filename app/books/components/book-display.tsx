"use client";;
import { Book } from "./book";
import { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/app/loading";
import { BookType } from "@/lib/types/types";

const BookDisplay = ({ books }: { books: BookType[] }) => {
  if (!books || books.length === 0) {
    return <p className="text-center">No books available at the moment.</p>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Carousel opts={{startIndex: 2, loop: true}}>
      <CarouselContent className="pl-8 md:my-0  overflow-visible">
          {books.map((book: BookType) => (
            <CarouselItem className="flex flex-wrap basis-2/3 items-center md:basis-1/3 lg:basis-1/4" key={book.id}>
              <Book key={book.id} book={book} className="" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Suspense>
  );
};

export default BookDisplay;
