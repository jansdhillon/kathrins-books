"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { BookType } from "@/lib/types/types";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

export const bookColumns: ColumnDef<BookType>[] = [
  // {
  //   accessorKey: "cover",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Cover" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[50px] md:max-w-[200px] truncate font-medium">
  //           {row?.original.image_directory && (
  //             <Image
  //               src={`${row?.original?.image_directory}image-1.png`}
  //               alt={row?.original.title}
  //               width={50}
  //               height={50}
  //             />
  //           )}
  //         </span>
  //       </div>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: true,
  // },
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
  },
  {
    accessorKey: "genre",
    accessorFn: (row) => row.genre,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Genre(s)" />
    ),
    cell: ({ row }) => {
      const genres = ((row.getValue("genre") as string) || "")
        .toString()
        .split(",") || ["-"];
      return (
        <div className="flex gap-1 flex-wrap">
          {genres
            .filter((g) => g.length > 0)
            .map((g) => (
              <div key={g}>
                <Badge className="mr-0.5">
                  <p className="line-clamp-1 max-w-[200px]">{g}</p>
                </Badge>
              </div>
            ))}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const genres = row.getValue(columnId) as string;
      return filterValue.every((filter: any) => genres.includes(filter));
    },
    enableSorting: true,
    enableHiding: true,
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
  {
    accessorKey: "created_at",
    accessorFn: (row) => row.created_at,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted On" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] md:max-w-[200px] truncate font-medium">
            {format(new Date(row.getValue("created_at")), "PP")}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

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
