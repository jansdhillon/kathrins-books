"use client";
import { ColumnDef } from "@tanstack/react-table";
import { OrderItemType } from "@/lib/types/types";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import Link from "next/link";

export const orderItemColumns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "image_directory",
    header: "Book",
    cell: ({ row }) =>
      row.original.image_directory ? (
        <Image
          src={`${row.original.image_directory}image-1.png`}
          alt={row?.original.book_title || "Book"}
          width={50}
          height={50}
        />
      ) : null,
  },
  {
    accessorKey: "book_title",
    header: "Title",
    cell: ({ row }) => row.original.book_title,
  },
  {
    accessorKey: "book_author",
    header: "Author(s)",
    cell: ({ row }) => row.original.book_author,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="" />
    ),
    cell: ({ row }) => (
      <Link href={`/books/${row.original.book_id}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size={"sm"}>
              <Eye size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Book</TooltipContent>
        </Tooltip>
      </Link>
    ),
  },
];
