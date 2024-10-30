"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const getAnalytics = async () => {
  const { GA_CLIENT_EMAIL, GA_PRIVATE_KEY_BASE64 } = process.env;

  if (!GA_CLIENT_EMAIL) {
    console.error("Missing GA_CLIENT_EMAIL");
    return;
  }

  if (!GA_PRIVATE_KEY_BASE64) {
    console.error("Missing GA_PRIVATE_KEY");
    return;
  }

  const GA_PRIVATE_KEY = Buffer.from(GA_PRIVATE_KEY_BASE64, "base64").toString(
    "utf-8"
  );

  const analyticsDataClient = new BetaAnalyticsDataClient({
    projectId: process.env.NEXT_PUBLIC_GA_PROJECT_ID,
    credentials: {
      client_email: GA_CLIENT_EMAIL,
      private_key: GA_PRIVATE_KEY,
    },
  });

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.NEXT_PUBLIC_GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });

  return response;
};

export { getAnalytics };
