import { OrderItemInsertType } from "@/lib/types/types";
import * as React from "react";

interface OrderConfirmationTemplateProps {
  orderId: string;
  orderItems: OrderItemInsertType[];
  itemsTotal: number;
  shippingCost: number;
}

export const OrderConfirmationTemplate: React.FC<
  OrderConfirmationTemplateProps
> = ({ orderId, orderItems, itemsTotal, shippingCost }) => (
  <div
    style={{
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }}
  >
    <h1
      style={{
        color: "#4a5568",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "10px",
        marginBottom: "20px",
        fontSize: "24px",
      }}
    >
      Order Confirmation
    </h1>
    <p>Thank you for your purchase! Here are the details of your order:</p>

    <div
      style={{
        backgroundColor: "#f7fafc",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <p><strong>Order ID:</strong> {orderId}</p>

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
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>Items Total</td>
            <td style={{ padding: "8px" }}>${(itemsTotal as number || 0)?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>Shipping Cost</td>
            <td style={{ padding: "8px" }}>${(shippingCost as number || 0)?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>Total</td>
            <td style={{ padding: "8px" }}>${(itemsTotal as number + shippingCost as number || 0.00)?.toFixed(2) }</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <p>You will receive another email when your items have been shipped.</p>

    <div
      style={{
        marginTop: "30px",
        paddingTop: "10px",
        borderTop: "1px solid #e2e8f0",
        color: "#718096",
        fontSize: "0.9em",
      }}
    >
      <p>This email was sent regarding your order at Kathrin's Books.</p>
    </div>
  </div>
);


export const KathrinOrderNotificationTemplate: React.FC<
  OrderConfirmationTemplateProps
> = ({ orderId, orderItems, itemsTotal, shippingCost }) => (
  <div
    style={{
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }}
  >
    <h1
      style={{
        color: "#4a5568",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "10px",
        marginBottom: "20px",
        fontSize: "24px",
      }}
    >
      New Order Notification
    </h1>
    <p>A new order has been placed! Here are the order details:</p>

    <div
      style={{
        backgroundColor: "#f7fafc",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <p><strong>Order ID:</strong> {orderId}</p>

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
          {orderItems.map((item) => (
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
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>Items Total</td>
            <td style={{ padding: "8px" }}>${itemsTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>Shipping Cost</td>
            <td style={{ padding: "8px" }}>${shippingCost.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>Total</td>
            <td style={{ padding: "8px" }}>${(itemsTotal + shippingCost).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <p>Please prepare for the fulfillment of this order.</p>

    <div
      style={{
        marginTop: "30px",
        paddingTop: "10px",
        borderTop: "1px solid #e2e8f0",
        color: "#718096",
        fontSize: "0.9em",
      }}
    >
      <p>This is an automated notification from Kathrin's Books.</p>
    </div>
  </div>
);
