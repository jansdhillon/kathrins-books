"use client";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../books/data-table-column-header";
import { OrderWithItemsType } from "@/lib/schemas/schemas";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { OrderItemsDataTable } from "./order-items-data-table";
import { orderItemColumns } from "./order-items-columns";

export const orderColumns: ColumnDef<OrderWithItemsType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2  max-w-[100px] md:max-w-[200px] ">
        <span className="font-medium overflow-x-scroll">
          {row.original.id || "-"}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => (
      <OrderItemsDataTable
        columns={orderItemColumns}
        data={row.original.items}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "ordered_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ordered On" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original?.ordered_at &&
          format(new Date(row.original?.ordered_at), "yyyy-MM-dd")}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge variant="default">{row.original.status}</Badge>,
    enableSorting: false,
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
          (((row.original.items_total as number) || 0) +
            ((row.original.shipping_cost as number) || 0)) /
          100
        ).toFixed(2)}
      </div>
    ),
  },
];
