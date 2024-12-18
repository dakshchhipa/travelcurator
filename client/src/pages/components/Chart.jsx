import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import { format } from "timeago.js";

export default function Chart({ data }) {
  const realData = data?.map((item) => ({
    price: item.totalPrice,
    date: format(item.createdAt),
  }));

  return (
    <div className="w-full m-2 h-60 bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Bookings</h2>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={realData}>
          <Tooltip
            content={(props) => (
              <div>
                {props.payload?.map((item) => {
                  return (
                    <div
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-lg"
                      key={item.payload.date}
                    >
                      <p>Price: ${item.value}</p>
                      <p>Date: {item.payload.date}</p>
                    </div>
                  );
                })}
              </div>
            )}
          />
          <YAxis dataKey={"price"} tickLine={false} tick={{ fill: "#4b4b4b" }} />
          <XAxis dataKey={"date"} tickLine={false} tick={{ fill: "#4b4b4b" }} />
          <Bar dataKey={"price"} fill="#4b4b4b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
