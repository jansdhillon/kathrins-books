"use server";

import { Resend } from "resend";

import { ContactEmailTemplate } from "@/components/email-templates/contact";
import { NewsletterTemplate } from "@/components/email-templates/newsletter";
import {
  KathrinOrderNotificationTemplate,
  OrderConfirmationTemplate,
} from "@/components/email-templates/order";
import { ShippingConfirmationTemplate } from "@/components/email-templates/shipping";
import {
  EmailType,
  ContactEmailData,
  NewsletterEmailData,
  OrderConfirmationEmailData,
  ShippingConfirmationEmailData,
} from "@/lib/types/types";

type EmailData =
  | ContactEmailData
  | NewsletterEmailData
  | OrderConfirmationEmailData
  | ShippingConfirmationEmailData;

export const sendEmail = async (data: EmailData, type: EmailType) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    let emailTemplate: JSX.Element;
    let subject: string;
    let toEmail: string;

    switch (type) {
      case "contact": {
        const { name, email, message } = data as ContactEmailData;

        if (!name || !email || !message) {
          console.error("Missing required fields for contact email");
          throw new Error("Missing required fields for contact email");
        }

        emailTemplate = (
          <ContactEmailTemplate name={name} email={email} message={message} />
        );
        subject = "New Contact Form Submission";
        toEmail = "kathrindhillon@gmail.com";
        break;
      }

      case "newsletter": {
        const { email, content } = data as NewsletterEmailData;

        if (!email || !content) {
          console.error("Missing required fields for newsletter email");
        }

        emailTemplate = <NewsletterTemplate content={content} />;
        subject = "Latest News from Kathrin's Books";
        toEmail = email;
        break;
      }

      case "order-confirmation": {
        const {
          name,
          email,
          orderId,
          orderItems,
          itemsTotal,
          shippingCost,
          address,
        } = data as OrderConfirmationEmailData;

        if (!address) {
          console.error("Missing billing details for order confirmation email");
          throw new Error(
            "Missing billing details for order confirmation email"
          );
        }

        if (

          !email ||
          !orderId ||
          !orderItems ||
          !itemsTotal ||
          !address
        ) {
          console.error("Missing required fields for order confirmation email");
          throw new Error(
            "Missing required fields for order confirmation email"
          );
        }

        emailTemplate = (
          <OrderConfirmationTemplate
            name={name || null}
            orderId={orderId}
            orderItems={orderItems}
            itemsTotal={itemsTotal}
            shippingCost={shippingCost}
            address={address}
          />
        );
        subject = "Your Order Confirmation";
        toEmail = email;
        break;
      }

      case "kathrin-notification": {
        const { orderId, orderItems, itemsTotal, shippingCost, address } =
          data as OrderConfirmationEmailData;

        if (!orderId || !orderItems || !itemsTotal) {
          console.error(
            "Missing required fields for Kathrin's notification email"
          );
          throw new Error(
            "Missing required fields for Kathrin's notification email"
          );
        }

        emailTemplate = (
          <KathrinOrderNotificationTemplate
            name="Kathrin"
            orderId={orderId}
            orderItems={orderItems}
            itemsTotal={itemsTotal}
            shippingCost={shippingCost}
            address={address}
          />
        );
        subject = "New Order Placed";
        toEmail = "kathrindhillon@gmail.com";
        break;
      }

      case "shipping-confirmation": {
        const {
          email,
          orderId,
          orderItems,
          itemsTotal,
          shippingCost,
          address,
          trackingNumber,
          shippingProvider,
        } = data as ShippingConfirmationEmailData;

        if (
          !orderItems ||
          !orderId ||
          !trackingNumber ||
          !shippingProvider ||
          !address
        ) {
          console.error(
            "Missing required fields for shipping confirmation email"
          );
          throw new Error(
            "Missing required fields for shipping confirmation email"
          );
        }

        emailTemplate = (
          <ShippingConfirmationTemplate
            orderId={orderId}
            orderItems={orderItems}
            itemsTotal={itemsTotal}
            shippingCost={shippingCost}
            address={address}
            trackingNumber={trackingNumber}
            shippingProvider={shippingProvider}
          />
        );
        subject = "Your Order Has Shipped";
        toEmail = email;
        break;
      }

      default:
        console.error("Invalid email type");
        throw new Error("Invalid email type");
    }

    await resend.emails.send({
      from: "Kathrin's Books <noreply@updates.kathrinsbooks.com>",
      to: toEmail,
      subject: subject,
      react: emailTemplate,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
