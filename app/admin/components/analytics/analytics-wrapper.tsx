"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

export function AnalyticsWrapper({ getAnalytics } : { getAnalytics: () => Promise<any> }) {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    async function fetchAnalytics() {
      const response = await getAnalytics();
      const data = await response.json();
      setAnalyticsData(
        data.rows.map((row: any) => ({
          date: row.dimensionValues[0].value,
          users: row.metricValues[0].value,
        }))
      );
    }
    fetchAnalytics();
  }, []);

  return (
    <LineChart width={500} height={300} data={analyticsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="users" stroke="#8884d8" />
    </LineChart>
  );
}