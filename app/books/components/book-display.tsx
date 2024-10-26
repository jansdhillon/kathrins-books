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
      <Carousel className="">
        <CarouselContent >
          {books.map((book: BookType) => (
            <CarouselItem className="flex items-center md:basis-1/2 lg:basis-1/4" key={book.id}>
              <Book key={book.id} book={book}  className="h-fit" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-2 lg:ml-0" />
        <CarouselNext className="mr-2 lg:mr-0"/>
      </Carousel>
    </Suspense>
  );
};

export default BookDisplay;
