"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BookType } from "@/lib/types/types";
import { DataTablePagination } from "./data-table-pagination";
import { Book } from "./book";
import { DataTableToolbar } from "./data-table-toolbar";

interface BookPageProps {
  books: BookType[];
  title: string;
  subtitle: string;
  query?: string;
}

export const BookPage = ({ books, title, subtitle, query }: BookPageProps) => {
  const [globalFilter, setGlobalFilter] = React.useState<string>(query || "");

  const columns: ColumnDef<BookType>[] = [
    {
      header: "Book",
      accessorKey: "title",
      cell: ({ row }) => {
        const book = row.original;
        return <Book key={book.id} book={book} />;
      },
      enableSorting: true,
    },
    {
      header: "Author",
      accessorKey: "author",
      accessorFn: (row) => row.author,
      cell: ({ row }) => null,
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
      header: "Genre",
      accessorKey: "genre",
      cell: ({ row }) => {
        null;
      },
      filterFn: (row, columnId, filterValue) => {
        const genres = row.getValue(columnId) as string[];
        return filterValue.every((filter: any) => genres.includes(filter));
      },
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => null,
      enableSorting: true,
    },
  ];

  const table = useReactTable({
    data: books,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const genreOptions = React.useMemo(() => {
    const genres = new Set<string>();
    books.forEach((item: any) => {
      if (item.genre) {
        item.genre.forEach((genre: string) => {
          genres.add(genre);
        });
      }
    });
    return Array.from(genres).map((genre) => ({
      label: genre,
      value: genre,
    }));
  }, [books]);

  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg text-muted-foreground font-medium">{subtitle}</p>

      <DataTableToolbar
        table={table}
        books={books}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        genreOptions={genreOptions}
      />

      <div className="max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className="h-full">
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className="h-full">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
