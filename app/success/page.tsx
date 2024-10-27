"use client";;
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "../loading";
import { postData } from "@/utils/helpers";
import { OrderItemsDataTable } from "../orders/[id]/data-table";
import { orderItemColumns } from "../orders/components/order-items-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams?.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
    }

    const fetchOrderDetails = async () => {
      try {
        const res = await postData({
          url: "/api/get-order-details",
          data: { session_id: sessionId },
        });

        setOrder(res?.orderWithItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <h1 className="text-2xl font-bold">Thank you for your purchase!</h1>
      <p className="text-lg text-muted-foreground font-medium">
        {" "}
        Your order has been placed successfully.
      </p>
      {!isLoading ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent>
              <OrderItemsDataTable columns={orderItemColumns} data={order} />
            </CardContent>
          </Card>
          <Link href="/orders" className="flex justify-center">
            <Button className="font-semibold">My Orders</Button>
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
