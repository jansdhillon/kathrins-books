"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCartAction } from "@/app/actions/add-to-cart";
import { useTransition } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import { BookType } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type BookProps = {
  book: BookType;
  className?: string;
};

export const imageLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function Book({ book, className }: BookProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = () => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("bookId", book.id);
      formData.append("quantity", "1");
      addToCartAction(formData);
    });
  };

  const coverImage =
    book.image_directory !== null && book.num_images && book.num_images > 0
      ? `${book.image_directory}image-1.png`
      : "/placeholder.png";

  return (
    <Card
      className={cn(
        "rounded-xl flex flex-col justify-between h-full max-w-[350px]   ",
        className
      )}
    >
      <div className="flex flex-col justify-start h-full">
        <CardHeader className="text-muted-foreground ">
          <Link
            href={`/books/${book.id}`}
            className="relative cursor-pointer space-y-4   "
          >
            <div className="w-full flex justify-center container max-h-[400px]">
              <Image
                src={coverImage}
                alt={book.title}
                width={300}
                height={400}
                className="object-contain rounded-xl border  aspect-auto "
                loader={imageLoader}
              />
            </div>
            <CardTitle className="text-xl font-semibold text-primary line-clamp-2 text-ellipsis ">
              {book.title}
            </CardTitle>
          </Link>
          <Separator />
          <p> by {book.author}</p>
          {book.genre && (
            <div className="flex gap-1 flex-wrap">
              {book.genre.map((g) =>
                g
                  .split(",")
                  .filter((g) => g.length > 0)
                  .map((g) => (
                    <div key={g}>
                      <Badge className="mr-0.5">
                        <p className="line-clamp-1 max-w-[200px]">{g}</p>
                      </Badge>
                    </div>
                  ))
              )}
            </div>
          )}
        </CardHeader>
        {book.description && (
          <CardContent className=" ">
            <CardDescription className="line-clamp-6 text-ellipsis leading-relaxed font-medium">
              {book.description || "No description available."}
            </CardDescription>
          </CardContent>
        )}
      </div>

      <CardFooter className=" flex justify-end gap-4">
        <Button
          onClick={handleAddToCart}
          size="sm"
          variant="default"
          disabled={isPending || book.stock === 0}
          className="font-bold"
        >
          {isPending ? (
            "Adding..."
          ) : (
            <>
              {book.stock > 0 ? (
                <>${book.price.toFixed(2)}</>
              ) : (
                `Sold`
              )}
            </>
          )}
        </Button>
        <Button size="sm" variant="ghost" asChild>
          <Link href={`/books/${book.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
