import { Address, OrderItemInsertType } from "@/lib/types/types";
import * as React from "react";

interface ShippingConfirmationTemplateProps {
  orderId: string;
  orderItems: OrderItemInsertType[];
  itemsTotal: number;
  shippingCost: number;
  address: Address;
  trackingNumber: string;
  shippingProvider: string;
}

export const ShippingConfirmationTemplate: React.FC<
  ShippingConfirmationTemplateProps
> = ({
  orderId,
  orderItems,
  itemsTotal,
  shippingCost,
  address,
  trackingNumber,
  shippingProvider,
}) => (
  <div
    style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6, color: "#333" }}
  >
    <h1
      style={{
        color: "#4a5568",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "10px",
      }}
    >
      Shipping Confirmation
    </h1>
    <p>Hello {address.name},</p>
    <p>Thanks for shopping at Kathrin's Books! Your order has been shipped:</p>
    <div
      style={{
        backgroundColor: "#f7fafc",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <p>
        <strong>Order ID:</strong> {orderId}
      </p>
      <p>
        <strong>Shipping Provider:</strong> {shippingProvider}
      </p>
      <p>
        <strong>Tracking Number:</strong> {trackingNumber}
      </p>

      <p>You can track your package using the tracking number provided.</p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#edf2f7",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "8px" }}>Book</th>
            <th style={{ padding: "8px" }}>Title</th>
            <th style={{ padding: "8px" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems?.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "8px" }}>
                {item?.image_directory && (
                  <img
                    src={`${item.image_directory}image-1.png`}
                    alt={item.book_title || "Book Image"}
                    width={50}
                    height={50}
                    style={{ borderRadius: "4px" }}
                  />
                )}
              </td>
              <td style={{ padding: "8px" }}>{item.book_title}</td>
              <td style={{ padding: "8px" }}>${item.price.toFixed(2)}</td>
            </tr>
          ))}

          <tr>
            <td colSpan={3} style={{ padding: "8px", fontWeight: "bold" }}>
              Shipping Address
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ padding: "8px" }}>
              <p>{address?.name}</p>
              <p>{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              <p>
                {address?.city}, {address?.state}, {address?.postal_code}
              </p>
              <p>{address?.country}</p>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Items Total
            </td>
            <td style={{ padding: "8px" }}>
              ${(((itemsTotal as number) || 0) / 100)?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Shipping Cost
            </td>
            <td style={{ padding: "8px" }}>
              ${(((shippingCost as number) || 0) / 100)?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Total
            </td>
            <td style={{ padding: "8px" }}>
              $
              {(
                (((itemsTotal as number) || 0) +
                  ((shippingCost as number) || 0)) /
                100
              )?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ padding: "8px" }}>
              <button>
                <a href={`https://kathrinsbooks.com/orders/${orderId}`}>
                  View Order
                </a>
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      <p>This email was sent for your order at Kathrin's Books.</p>
    </div>
  </div>
);
