import React from "react";
import { formetDate } from "../../../utils/formateDate";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const formatData = (blogs) => {
  return blogs.map((blog) => ({
    name: formetDate(blog.createdAt), // Corrected formatDate
    post: blog.title.length, // This returns the length of the title (not the title itself)
    pv: blog.pageViews || 0, // Handle missing pageViews
    amt: blog.amt || 0, // Handle missing amt
  }));
};

function BlogsChart({ blogs }) {
  const data = formatData(blogs);
  return (
    <div>
      <h2>Blogs Chart</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {" "}
          {/* Corrected height */}
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="post"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BlogsChart;
