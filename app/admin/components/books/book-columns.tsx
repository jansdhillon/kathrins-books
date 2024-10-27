"use client";;
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { BookType } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";

export const bookColumns: ColumnDef<BookType>[] = [
  {
    accessorKey: "cover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Book" />
    ),
    cell: ({ row }) => {
      return (
        <Link className="flex space-x-2" href={`/books/${row?.original.id}`}>
          <span className="max-w-[50px] md:max-w-[200px] truncate font-medium rounded-sm">
            <Image
              src={
                row?.original.image_directory !== null &&
                row?.original.num_images &&
                row?.original.num_images > 0
                  ? `${row?.original.image_directory}image-1.png`
                  : "/placeholder.png"
              }
              alt={row?.original.title}
              className="object-contain "
              width={50}
              height={50}
            />
          </span>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] md:max-w-[200px] lg:max-w-[300px] truncate font-medium text-ellipsis">
            {row.original.title || "-"}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "author",
    accessorFn: (row) => row.author,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] md:max-w-[200px] truncate font-medium">
            {row.getValue("author")}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    enableGlobalFilter: true,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterValue) => {
      return filterValue.every((filter: any) =>
        row.original.author.includes(filter)
      );
    },
  },
  {
    accessorKey: "price",
    accessorFn: (row) => row.price,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] md:max-w-[200px] truncate font-medium">
            ${(row.getValue("price") as number).toFixed(2)}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: "genre",
  //   accessorFn: (row) => (row?.genre),
  //   cell: ({ row }) => null,
  //   filterFn: (row, columnId, filterValue) => {
  //     const genres = row.getValue(columnId) as string;
  //     return filterValue.every((filter: any) => genres.includes(filter));
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-center"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
