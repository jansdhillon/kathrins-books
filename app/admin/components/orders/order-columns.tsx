"use client";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../data-table-column-header";
import { OrderWithItemsType } from "@/lib/schemas/schemas";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye } from "lucide-react";

export const orderColumns: ColumnDef<OrderWithItemsType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "ordered_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ordered On" />
    ),
    cell: ({ row }) => (
      <div>{format(new Date(row.original.ordered_at), "yyyy-MM-dd")}</div>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.items.length > 0 ? (
          row.original.items.map((item) => (
            <div key={item.id}>{item.book_title}</div>
          ))
        ) : (
          <div>No items</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge variant="default">{row.original.status}</Badge>,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div>
        $
        {(
          (row?.original?.items_total || 0) +
          ((row?.original?.shipping_cost &&
            row?.original?.shipping_cost / 100) ||
            0)
        ).toFixed(2)}
      </div>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <Link href={`/orders/${row.original.id}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size={"sm"}>
              <Eye size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Order</TooltipContent>
        </Tooltip>
      </Link>
    ),
  },
];
