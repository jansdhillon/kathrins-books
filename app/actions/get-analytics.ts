"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const getAnalytics = async () => {
  const GA_PRIVATE_KEY_JSON = JSON.parse(process.env.GA_PRIVATE_KEY!);
  const GA_PRIVATE_KEY = GA_PRIVATE_KEY_JSON.private_key;
  const GA_CLIENT_EMAIL = GA_PRIVATE_KEY_JSON.client_email;
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: { client_email: GA_CLIENT_EMAIL, private_key: GA_PRIVATE_KEY },
  });
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
    dimensions: [{ name: "date" }],
  });
  console.log("Response from GA", response);
  return response;
};

export { getAnalytics };
