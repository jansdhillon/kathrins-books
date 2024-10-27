import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { orderColumns } from "@/app/orders/components/order-columns";
import { getAllOrders } from "../actions/get-all-orders";
import { UserOrdersDataTable } from "./components/data-table";
import { createClient } from "@/utils/supabase/server";

export default async function OrdersPage() {
  const supabase = createClient();
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (!user?.user) {
    redirect("/sign-in");
  }

  const orders = await getAllOrders();

  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-muted-foreground font-medium">
        {" "}
        View and track your book orders.
      </p>
      {orders && orders?.length > 0 ? (
        <UserOrdersDataTable columns={orderColumns} data={orders} />
      ) : (
        <p className="text-center text-muted-foreground">
          You haven't placed any orders yet.
        </p>
      )}
    </div>
  );
}
