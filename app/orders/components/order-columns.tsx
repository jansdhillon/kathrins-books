"use client";;
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { OrderWithItemsType } from "@/lib/schemas/schemas";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { orderItemColumns } from "./order-items-columns";
import { OrderItemsDataTable } from "../[id]/data-table";

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
    accessorKey: "ordered_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ordered On" />
    ),
    cell: ({ row }) => (
      <div >{format(new Date(row.original.ordered_at), "yyyy-MM-dd")}</div>
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
    filterFn: (row, columnId, filterValue) => {
      return row.original.items.some((item) =>
        item?.book_title?.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
    enableSorting: true,
    enableHiding: true,
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
        {((row.original.items_total || 0) + (row.original.shipping_cost || 0) / 100).toFixed(2)}
      </div>
    ),
  },
];
