import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserDataAction } from "../actions/get-user";
import { DataTable } from "@/app/orders/components/data-table";
import { orderColumns } from "@/app/orders/components/order-columns";
import { getAllOrders } from "../actions/get-all-orders";

export default async function OrdersPage() {

  const supabase = createClient();

  const { data: userData, error: authError } = await getUserDataAction();
  if (authError) {
    redirect("/sign-in");
  }

  const orders = await getAllOrders(supabase);



  return (
    <div className="flex flex-1 flex-col space-y-6 mx-auto container">
      <h1 className="text-2xl font-bold text-left">Your Orders</h1>
      <Separator />
      <p className="text-lg text-muted-foreground">
        View and track your book orders.
      </p>
      {orders && orders?.length > 0 ? (
        <DataTable columns={orderColumns} data={orders} />
      ) : (
        <p className="text-center text-muted-foreground">
          You haven't placed any orders yet.
        </p>
      )}
    </div>
  );
}
