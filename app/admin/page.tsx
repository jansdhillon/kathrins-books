import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllBooks } from "../actions/get-all-books";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { BooksClientWrapper } from "./components/books/client-wrapper";
import { OrdersClientWrapper } from "./components/orders/client-wrapper";
import { getAllOrders } from "../actions/get-all-orders";

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to view this page"
    );
  }




  const books = await getAllBooks();

  const orders = await getAllOrders();


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Tabs defaultValue="books" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>

            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="orders" className="space-y-4">
          <OrdersClientWrapper data={orders} />
        </TabsContent>
        <TabsContent value="books" className="space-y-4 ">
          <BooksClientWrapper data={books} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
