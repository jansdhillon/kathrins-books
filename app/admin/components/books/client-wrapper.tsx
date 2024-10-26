"use client";

import { BookType } from "@/lib/types/types";
import { ResponsiveContainer } from "recharts";

import { AdminBooksDataTable } from "./data-table";
import { bookColumns } from "./book-columns";

export const BooksClientWrapper = ({ data }: { data: BookType[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AdminBooksDataTable columns={bookColumns} data={data} />
    </ResponsiveContainer>
  );
};
