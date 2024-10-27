"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ShippingAndDeliveryPage() {
  return (
    <div className="flex flex-1 flex-col space-y-6 container mx-auto">
      <h1 className="text-2xl font-bold text-left">Shipping</h1>
      <Separator />

      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">1. Standard Shipping</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <span className="font-semibold">Cost:</span> $15 flat rate per
              order.
            </li>
            <li>
              <span className="font-semibold">Delivery Time:</span> 3-5 business
              days within Canada.
            </li>
            <li>
              <span className="font-semibold">Details:</span> Orders are shipped
              via Canada Post or similar carriers. Tracking information will be
              provided once your order has been shipped.
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            2. Free Shipping Over Orders of $75
          </h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Cost:</strong> Free for orders over $75.
            </li>
            <li>
              <strong>Delivery Time:</strong> 3-5 business days within Canada.
            </li>
            <li>
              <strong>Details:</strong> Orders are shipped via Canada Post or
              similar carriers. Tracking information will be provided once your
              order has been shipped.
            </li>
          </ul>
        </div>

        <p className="text-muted-foreground pt-6">
          Questions or Special Requests?{" "}
          <Link href="/contact" className="font-bold underline">
            Contact us
          </Link>
          .
        </p>
      </div>
      <Separator />
      <h1 className="text-xl font-bold text-left">Returns & Refunds</h1>

      <p className="text-md">
        Unfortunately we are unable to offer returns or refunds at this time.
        Please refer to our terms of service for more information.
      </p>
    </div>
  );
}
