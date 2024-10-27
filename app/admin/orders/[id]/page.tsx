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
import { getOrderAction } from "@/app/actions/get-order-by-id";
import Loading from "@/app/loading";
import { updateOrderStatus } from "@/app/actions/update-order-status";
import { useToast } from "@/utils/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { orderItemColumns } from "../../components/orders/order-items-columns";
import { OrderItemsDataTable } from "../../components/orders/order-items-data-table";
import { sendEmail } from "@/app/actions/send-email";
import { Address, OrderItemType, OrderType } from "@/lib/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [shippingProvider, setShippingProvider] = useState<string>("");

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

  const getOrderStatusMessage = (
    status:
      | "Delivered"
      | "Shipped"
      | "Ordered"
      | "Failed"
      | "pending"
      | null
      | undefined
      | null
  ) => {
    switch (status) {
      case "Delivered":
        return "Order has been delivered.";
      case "Shipped":
        return "Order is in transit.";
      case "Ordered":
        return "Order has been placed successfully and is ready for processing.";
      case "Failed":
        return "There was an issue with this order. Please review the details.";
      case "pending":
        return "Order is being processed.";
      default:
        return "Unknown order status. Please investigate.";
    }
  };

  const handleUpdateOrderStatus = async (
    newStatus:
      | "Delivered"
      | "Shipped"
      | "Ordered"
      | "Failed"
      | "pending"
      | null
      | undefined
  ) => {
    try {
      if (!order) {
        return;
      }

      if (newStatus === "Shipped" && (!trackingNumber || !shippingProvider)) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description:
            "Please provide both tracking number and shipping provider.",
        });
        return;
      }

      await updateOrderStatus(
        order.id,
        newStatus,
        trackingNumber,
        shippingProvider
      );

      if (newStatus === "Shipped") {
        await sendEmail(
          {
            email: address?.email!,
            orderId: order.id,
            trackingNumber,
            shippingProvider,
          },
          "shipping-confirmation"
        );
      }

      toast({
        variant: "default",
        title: "Order status updated",
        description: `Order status has been updated to ${newStatus}`,
      });

      setTrackingNumber("");
      setShippingProvider("");

      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status.",
      });
    }
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
              <p className=" flex w-full justify-center font-bold text-base text-primary">{statusMessage}</p>
            </div>
          </CardHeader>

          <CardContent>
            <OrderItemsDataTable columns={orderItemColumns} data={orderItems} />
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <h4 className="font-semibold">Manage Order Status</h4>
            <div className="flex flex-col space-y-4">
              {order.status !== "Shipped" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="trackingNumber">Tracking Number</Label>
                      <Input
                        id="trackingNumber"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingProvider">
                        Shipping Provider
                      </Label>
                      <Input
                        id="shippingProvider"
                        value={shippingProvider}
                        onChange={(e) => setShippingProvider(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleUpdateOrderStatus("Shipped")}
                    variant="outline"
                  >
                    Mark as Shipped
                  </Button>
                </>
              )}
              {order.status === "Shipped" && (
                <Button
                  onClick={() => handleUpdateOrderStatus("Delivered")}
                  variant="outline"
                >
                  Mark as Delivered
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  );
}
