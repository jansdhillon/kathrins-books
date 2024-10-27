import { OrderItemInsertType, Address } from "@/lib/types/types";
import { BillingDetails } from "@stripe/stripe-js";
import * as React from "react";

interface OrderConfirmationTemplateProps {
  name: string;
  orderId: string;
  orderItems: OrderItemInsertType[];
  itemsTotal: number;
  shippingCost: number;
  address: Address;
}

export const OrderConfirmationTemplate: React.FC<
  OrderConfirmationTemplateProps
> = ({ name, orderId, orderItems, itemsTotal, shippingCost, address }) => (
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
    <p>Hi {name},</p>
    <p>Thanks for shopping at Kathrin's Books! Here are the order details:</p>

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
                {address?.city}, {address?.postal_code}
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
              ${((itemsTotal || (0 as number)) / 100)?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Shipping Cost
            </td>
            <td style={{ padding: "8px" }}>
              ${((shippingCost || (0 as number)) / 100)?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Total
            </td>
            <td style={{ padding: "8px" }}>
              $
              {(
                (itemsTotal || (0 as number) + shippingCost || (0 as number)) /
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
    </div>

    <p>You will receive another email when your items have been shipped.</p>

    <div>
      <p>
        If you have any questions or concerns, please don't hesitate to contact
        us via email at{" "}
        <a href="mailto:kathrinsbookshelp@gmail.com">
          kathrinsbookshelp@gmail.com
        </a>
        .
      </p>
    </div>

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
> = ({ orderId, orderItems, itemsTotal, shippingCost, address }) => (
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
      <p>
        <strong>Order ID:</strong> {orderId}
      </p>

      <div>
        <h2 style={{ padding: "8px", fontWeight: "bold" }}>Shipping Address</h2>
      </div>
      <div>
        <div style={{ padding: "8px" }}>
          <p>{address?.name}</p>
          <p>{address?.line1}</p>
          <p>{address?.line2}</p>
          <p>
            {address?.city}, {address?.postal_code}
          </p>
          <p>{address?.country}</p>
        </div>
      </div>

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
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Items Total
            </td>
            <td style={{ padding: "8px" }}>
              ${((itemsTotal || (0 as number)) / 100)?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Shipping Cost
            </td>
            <td style={{ padding: "8px" }}>
              ${((shippingCost || (0 as number)) / 100)?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: "8px", fontWeight: "bold" }}>
              Total
            </td>
            <td style={{ padding: "8px" }}>
              $
              {(
                (itemsTotal || (0 as number) + shippingCost || (0 as number)) /
                100
              )?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ padding: "8px" }}>
              <button>
                <a href={`https://kathrinsbooks.com/admin/orders/${orderId}`}>
                  View Order
                </a>
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <p>Please prepare to ship of the books in this order.</p>

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
