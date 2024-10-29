"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const getAnalytics = async () => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.NEXT_PUBLIC_GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });
  return response;
};

export { getAnalytics };
