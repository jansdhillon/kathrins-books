"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const getAnalytics = async () => {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    projectId: process.env.NEXT_PUBLIC_GA_PROJECT_ID,
  });
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.NEXT_PUBLIC_GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });
  return response;
};

export { getAnalytics };
