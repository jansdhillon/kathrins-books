"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getOrderAction } from "@/app/actions/get-order-by-id";
import Loading from "@/app/loading";
import { updateOrderStatus } from "@/app/actions/update-order-status";
import { useToast } from "@/utils/hooks/use-toast";
import { OrderItemType, OrderType } from "@/lib/schemas/schemas";
import { createClient } from "@/utils/supabase/client";
import { Address } from "@/lib/types/types";
import { orderItemColumns } from "../../components/orders/order-items-columns";
import { OrderItemsDataTable } from "../../components/orders/order-items-data-table";

export default function AdminOrderDetailsPage({
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

  const { toast } = useToast();

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
        return "Order has been delivered.";
      case "Shipped":
        return "Order is in transit.";
      case "Ordered":
        return "Order has been placed successfully and is ready for processing.";
      case "Failed":
        return "There was an issue with this order. Please review the details.";
      case "Pending":
        return "Order is being processed.";
      default:
        return "Unknown order status. Please investigate.";
    }
  };

  const handleUpdateOrderStatus = async (newStatus: string) => {
    try {
      if (!order) {
        return;
      }
      await updateOrderStatus(order.id, newStatus);
      toast({
        variant: "default",
        title: "Order status updated",
        description: `Order status has been updated to ${newStatus}`,
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
    console.log("Updating order status to:", newStatus);
  };

  if (isLoading) {
    return <Loading />;
  }

  const statusMessage = order ? getOrderStatusMessage(order?.status) : "";

  return (
    order && (
      <div className="mx-auto w-full space-y-8">
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
                <span className="font-semibold">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(order?.ordered_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Total:</span> $
                {((order?.items_total || (0 as number)) / 100).toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Shipping:</span> $
                {((order?.shipping_cost || (0 as number)) / 100).toFixed(2)}
              </p>
              {address && (
                <p>
                  <span className="font-semibold">Shipping Address:</span>{" "}
                  {`${address?.name!}, `}
                  {`${address?.line1!}, `}
                  {address?.line2 && `${address.line2!}, `}
                  {`${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`}
                </p>
              )}

              <p className="text-base font-semibold text-card-foreground">{statusMessage}</p>
            </div>
          </CardHeader>

          <CardContent>
            <OrderItemsDataTable columns={orderItemColumns} data={orderItems} />
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <h4 className="font-semibold">Manage Order Status</h4>
            <div className="flex space-x-4">
              <Button
                onClick={() => handleUpdateOrderStatus("Shipped")}
                variant="outline"
              >
                Mark as Shipped
              </Button>
              <Button
                onClick={() => handleUpdateOrderStatus("Delivered")}
                variant="outline"
              >
                Mark as Delivered
              </Button>
              {/* <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Cancel Order</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this order?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Go Back</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleUpdateOrderStatus("Cancelled")}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog> */}
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  );
}
