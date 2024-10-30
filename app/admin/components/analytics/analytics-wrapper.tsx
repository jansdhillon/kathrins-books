"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Suspense, useEffect, useState } from "react";
import moment from "moment";
import Loading from "@/app/loading";

export function AnalyticsWrapper({
  getAnalytics,
}: {
  getAnalytics: () => Promise<any>;
}) {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      const data = await getAnalytics();
      console.log("Data from GA", data);
      setAnalyticsData(
        data.rows?.map((row: any) => ({
          date:
            row?.dimensionValues &&
            row.dimensionValues[0]?.value &&
            moment(row.dimensionValues[0].value, "YYYYMMDD").format(
              "DD/MM/YYYY"
            ),
          users: row?.metricValues && row.metricValues[0]?.value,
        }))
      );
      setLoading(false);
      console.log("Analytics data", analyticsData);
    }
    fetchAnalytics();
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <Suspense>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                label="users"
                name="Users"
                dataKey="users"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Suspense>
        </ResponsiveContainer>
      )}
    </div>
  );
}
