"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { BookIcon, Search, User2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { BookType } from "@/lib/schemas/schemas";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  books: BookType[];
  globalFilter?: string;
  setGlobalFilter: (value: string) => void;
  genreOptions: { label: string; value: string }[];
}

export function DataTableToolbar<TData>({
  table,
  books,
  globalFilter,
  setGlobalFilter,
  genreOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    setGlobalFilter(searchTerm);
  };

  useEffect(() => {
    if (query) {
      setGlobalFilter(decodeURIComponent(query));
    }
  }, [query]);

  const authorOptions = useMemo(() => {
    const authors = new Set<string>();
    books.forEach((book: BookType) => {
      authors.add(book.author);
    });
    return Array.from(authors).map((author) => ({
      label: author,
      value: author,
    }));
  }, [books]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            value={globalFilter ?? ""}
            onChange={handleFilterChange}
            placeholder="Search books..."
            className="w-full max-w-sm pl-8 text-foreground"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={10}
          />
        </div>

        <DataTableFacetedFilter
          column={table.getColumn("author")}
          title="Author"
          icon={<User2Icon />}
          options={authorOptions}
        />

        <DataTableFacetedFilter
          column={table.getColumn("genre")}
          title="Genre"
          icon={<BookIcon />}
          options={genreOptions}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* <Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <SortDescIcon className="w-4 h-4  " />
                  <span className="sr-only">Sort Results</span>
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <TooltipContent>Sort Requests</TooltipContent>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSort({ sort: "newest" })}>
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort({ sort: "oldest" })}>
                Oldest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort({ sort: "due" })}>
                Due
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Tooltip> */}
      </div>
    </div>
  );
}
