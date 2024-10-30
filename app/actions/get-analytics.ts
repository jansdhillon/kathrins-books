"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const getAnalytics = async () => {
  if (!process.env.GA_CLIENT_EMAIL) {
    console.error("Missing GA_CLIENT_EMAIL");
    return;
  }

  if (!process.env.GA_PRIVATE_KEY) {
    console.error("Missing GA_PRIVATE_KEY");
    return;
  }

  const analyticsDataClient = new BetaAnalyticsDataClient({
    projectId: process.env.NEXT_PUBLIC_GA_PROJECT_ID,
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key: JSON.parse(process.env.GA_PRIVATE_KEY!),
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
