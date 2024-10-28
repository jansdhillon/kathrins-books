"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCartAction } from "@/app/actions/add-to-cart";
import { Suspense, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/app/loading";
import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import { BookType } from "@/lib/types/types";
import { Skeleton } from "../../../components/ui/skeleton";
import { imageLoader } from "./book";
import { createClient } from "@/utils/supabase/client";

type BookDetailsProps = {
  book: BookType;
};

export function BookDetails({ book }: BookDetailsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const coverImage =
    book.image_directory !== null && book.num_images && book.num_images > 0
      ? `${book.image_directory}image-1.png`
      : "/placeholder.png";

  const additionalImages =
    book.num_images && book.num_images > 1
      ? Array.from(
          { length: book.num_images - 1 },
          (_, i) => `${book.image_directory}image-${i + 2}.png`
        )
      : [];

  const handleAddToCart = () => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("bookId", book.id);
      formData.append("quantity", "1");
      addToCartAction(formData);
    });
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const { data: user, error } = await supabase.auth.getUser();
      if (error || !user?.user) {
        return;
      }

      if (user.user.user_metadata.is_admin === true) {
        setIsAdmin(true);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <div>
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      <Suspense fallback={<Loading />}>
      <Carousel className="mx-10">
          <CarouselContent>
            <CarouselItem
              className={`flex flex-col rounded-xl justify-center ${
                book.num_images && book.num_images > 1
                  ? "md:basis-1/2 lg:basis-1/3"
                  : ""
              }`}
            >
              <Link
                href={coverImage}
                className="relative cursor-pointer mb-5 flex justify-center "
              >
                <Image
                  src={coverImage}
                  alt={book.title}
                  width={400}
                  height={600}
                  className="object-contain rounded-xl h-auto max-w-full max-h-[600px]"
                  sizes="(max-width: 500px) 100vw, 50vw"
                  loader={imageLoader}
                />
              </Link>
            </CarouselItem>
            {/* Additional Images */}
            {book?.image_directory !== null &&
              additionalImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col md:basis-1/2 lg:basis-1/3 rounded-xl justify-center"
                >
                  <Link
                    href={image}
                    className="relative cursor-pointer mb-5 flex justify-center"
                  >
                    <Image
                      src={image}
                      alt={`${book.title} - Image ${index + 2}`}
                      width={400}
                      height={600}
                      className="object-contain rounded-xl h-auto max-w-full max-h-[600px]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loader={imageLoader}
                    />
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
          {book && (book.num_images ?? 0) > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </Suspense>

      <div className="flex md:flex-col items-center gap-4 justify-between">
        <div className="flex-1 w-full">
          <CardHeader className="text-muted-foreground">
            <div className="flex md:flex-col justify-between items-start flex-row">
              <div className="flex items-baseline">
                <CardTitle className="text-2xl font-semibold text-primary mb-4">
                  {book.title}
                </CardTitle>
                {isAdmin && (
                  <Link href={`/admin/edit/${book.id}`}>
                    <Pen className="ml-2 h-5 w-5 cursor-pointer" />
                  </Link>
                )}
              </div>
            </div>
            <Separator className="my-4" />

            <div className="space-y-2 pb-4">
              <p>
                <span className="text-primary font-semibold">Author(s):</span>{" "}
                {book.author}
              </p>
              {book.isbn && (
                <p>
                  <span className="text-primary font-semibold">ISBN:</span>{" "}
                  {book.isbn}
                </p>
              )}
              {book.genre && book.genre.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  <span className="text-primary font-semibold">Genre(s):</span>
                  {book.genre
                    .join(",")
                    .split(",")
                    .filter((g) => g.trim().length > 0)
                    .map((g) => (
                      <div key={g}>
                        <Badge className="mr-0.5">
                          <p className="line-clamp-1 max-w-[200px]">{g}</p>
                        </Badge>
                      </div>
                    ))}
                </div>
              )}
              {book.publication_date && (
                <p>
                  <span className="text-primary font-semibold">
                    Publication Date:
                  </span>{" "}
                  {book.publication_date || "Not specified"}
                </p>
              )}
              {book.publisher && (
                <p>
                  <span className="text-primary font-semibold">Publisher:</span>{" "}
                  {book.publisher || "Not specified"}
                </p>
              )}
              {book.edition && (
                <p>
                  <span className="text-primary font-semibold">Edition:</span>{" "}
                  {book.edition || "Not specified"}
                </p>
              )}
              {book.condition && (
                <p>
                  <span className="text-primary font-semibold">Condition:</span>{" "}
                  {book.condition || "Not specified"}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-between items-end">
              <>
                {book.stock > 0 && (
                  <p className="text-xl font-semibold text-primary mb-4">
                    ${book.price.toFixed(2)}{" "}
                  </p>
                )}
              </>

              <Button
                onClick={handleAddToCart}
                disabled={isPending || book.stock <= 0}
              >
                {isPending ? (
                  "Adding to Cart..."
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />{" "}
                    <>{book.stock > 0 ? "Add to Cart" : `Sold`}</>
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              Description
            </h3>
            <Separator className="my-4" />
            <p className="leading-loose font-normal ">
              {book.description || "No description available."}
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
