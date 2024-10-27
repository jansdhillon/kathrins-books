"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getOrderAction } from "@/app/actions/get-order-by-id";
import Loading from "@/app/loading";
import { OrderItemsDataTable } from "@/app/orders/[id]/data-table";
import { orderItemColumns } from "@/app/orders/components/order-items-columns";
import { createClient } from "@/utils/supabase/client";
import { Address, OrderItemType, OrderType } from "@/lib/types/types";
import { Badge } from "@/components/ui/badge";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const orderId = params.id;
  const [order, setOrder] = useState<OrderType | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const supabase = createClient();
        setIsLoading(true);
        const { order, orderItems, error } = await getOrderAction(orderId);

        if (error) {
          setError(error.message);
          return;
        }

        setOrder(order);
        setOrderItems(orderItems);
        if (!order) {
          setError("Order not found.");
          return;
        }
        if (!order.address) {
          setError("Address not found.");
          return;
        }
        const { name, email, line1, line2, city, state, postal_code, country } =
          order.address as Address;
        console.log(order.address);
        setAddress({
          name,
          email,
          line1,
          line2,
          city,
          state,
          postal_code,
          country,
        });
        const { data: user, error: authError } = await supabase.auth.getUser();
        if (authError || !user?.user) {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to load order details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const getOrderStatusMessage = (status: string | null) => {
    switch (status) {
      case "Delivered":
        return "Your order has been delivered! We hope you enjoy your purchase.";
      case "Shipped":
        return "Your order is on its way! You will receive it soon.";
      case "Ordered":
        return "Your order has been placed successfully! It will be shipped soon.";
      case "Failed":
        return "There was an issue with your order. Please contact support.";
      case "Pending":
        return "Your order is being processed. Thank you for your patience!";
      default:
        return "Unknown order status. Please contact support for more information.";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const statusMessage = order ? getOrderStatusMessage(order?.status) : "";

  return (
    order && (
      <div className="container mx-auto w-full space-y-8">
        <div>
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <div className="text-sm space-y-4 pt-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-primary">Order ID:</span>{" "}
                {order.id}
              </p>
              <p>
                <span className="font-semibold text-primary">Order Date:</span>{" "}
                {new Date(order?.ordered_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-primary">Total:</span> $
                {((order?.items_total || (0 as number)) / 100).toFixed(2)}
              </p>
              <p>
                <span className="font-semibold text-primary">Shipping:</span> $
                {((order?.shipping_cost || (0 as number)) / 100).toFixed(2)}
              </p>
              {address && (
                <p>
                  <span className="font-semibold text-primary">
                    Shipping Address:
                  </span>{" "}
                  {`${address?.name!}, `}
                  {`${address?.line1!}, `}
                  {address?.line2 && `${address.line2!}, `}
                  {`${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`}
                </p>
              )}

              <p>
                <span className="font-semibold text-primary">Status:</span>{" "}
                <Badge>{order.status}</Badge>
              </p>
              {order.status === "Shipped" && (
                <>
                  <p>
                    <span className="font-semibold text-primary">
                      Tracking Number:
                    </span>{" "}
                    {order.tracking_number}
                  </p>
                  <p>
                    <span className="font-semibold text-primary">
                      Shipping Provider:
                    </span>{" "}
                    {order.shipping_provider}
                  </p>
                </>
              )}
              <p className=" flex w-full justify-center font-bold text-base text-primary">
                {statusMessage}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <OrderItemsDataTable columns={orderItemColumns} data={orderItems} />
          </CardContent>
        </Card>
      </div>
    )
  );
}
