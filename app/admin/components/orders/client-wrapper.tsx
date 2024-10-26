"use client";
import { ResponsiveContainer } from "recharts";

import { AdminOrdersDataTable } from "./orders-data-table";
import { OrderWithItemsType } from "@/lib/schemas/schemas";
import { orderColumns } from "./order-columns";

export const OrdersClientWrapper = ({ data }: { data: OrderWithItemsType[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AdminOrdersDataTable columns={orderColumns} data={data} />
    </ResponsiveContainer>
  );
};
