"use client";;
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { BookSchema } from "@/lib/schemas/schemas";
import { Eye, Pen, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBook } from "@/app/actions/delete-book";
import { getProductByBookId } from "@/app/actions/get-product";
import { DeleteBookForm } from "./delete-book-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const book = BookSchema.parse(row.original);

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <Link
          href={`/books/${book.id}`}
          className="flex justify-center items-center "
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size={"sm"}>
                <Eye size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Book</TooltipContent>
          </Tooltip>
        </Link>
        <Link href={`/admin/edit/${book.id}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size={"sm"}>
                <Pen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Book</TooltipContent>
          </Tooltip>
        </Link>
        <AlertDialog>
          <Tooltip>
            <AlertDialogTrigger asChild  className="text-destructive hover:text-destructive/90 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <TooltipTrigger asChild >
                <Button  variant="ghost" size={"sm"}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
            </AlertDialogTrigger>
            <TooltipContent>Delete Book</TooltipContent>
          </Tooltip>

          <AlertDialogContent className="max-w-xs">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                book.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <DeleteBookForm
                deleteBook={deleteBook}
                bookId={book.id}
                getProductByBookId={getProductByBookId}
                alertDialogAction={
                  <AlertDialogAction
                    type="submit"
                    className="h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full"
                  >
                    Delete
                  </AlertDialogAction>
                }
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
