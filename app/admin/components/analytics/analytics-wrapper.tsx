"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

export function AnalyticsWrapper({ getAnalytics } : { getAnalytics: () => Promise<any> }) {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    async function fetchAnalytics() {
      const data = await getAnalytics();
      console.log("Data from GA", data);
      setAnalyticsData(
        data.rows?.map((row: any) => ({
          date: row?.dimensionValues && row.dimensionValues[0]?.value,
          users: row?.metricValues && row.metricValues[0]?.value,
        }))
      );
      console.log("Analytics data", analyticsData);
    }
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6 flex flex-col w-full place-items-center container">
      <LineChart width={500} height={300} data={analyticsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
