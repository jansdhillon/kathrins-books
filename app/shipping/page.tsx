"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ShippingAndDeliveryPage() {
  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <h1 className="text-2xl font-bold">Shipping</h1>
      <p className=" text-muted-foreground font-semibold">
        {" "}
        Learn more about our shipping options and return options.
      </p>

      <div className="space-y-8">
        <div className="space-y-2">
          <p>
            All prices listed are in Canadian dollars. We do not offer
            international shipping at this time.{" "}
          </p>
          <p>
            Orders are shipped from Calgary, Alberta via Canada Post or similar
            carriers. Tracking information will be provided once your order has
            been shipped.
          </p>
          <p>We offer the following shipping options:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <span className="font-medium text-muted-foreground">Standard Shipping:</span> $15 flat
              rate per order
            </li>
            <li>
              <span className="font-medium text-muted-foreground">Free Shipping:</span> Orders over $75
            </li>
          </ul>
        </div>

        <p className=" pt-6">
          Questions or Special Requests?{" "}
          <Link
            href="/contact"
            className="text-muted-foreground font-medium underline"
          >
            Contact us
          </Link>
          .
        </p>
      </div>
      <Separator />
      <h1 className="text-xl font-bold text-left">Returns & Refunds</h1>

      <p className="text-md">
        Unfortunately we are unable to offer returns or refunds at this time.
        Please refer to our <a href="/terms" className="font-medium underline text-muted-foreground">terms of service</a> for more information.
      </p>
    </div>
  );
}
