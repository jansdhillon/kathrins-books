"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const getAnalytics = async () => {
  const GA_CLIENT_EMAIL = process.env.GA_CLIENT_EMAIL;
  const GA_PRIVATE_KEY_JSON = JSON.parse(process.env.GA_PRIVATE_KEY!);
  const GA_PRIVATE_KEY = GA_PRIVATE_KEY_JSON.private_key;
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: { client_email: GA_CLIENT_EMAIL, private_key: GA_PRIVATE_KEY },
  });
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });
  return response;
};

export { getAnalytics };
