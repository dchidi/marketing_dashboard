import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

// Sample data: replace with your own
interface GraphDataProps {
  date: string;
  free: number;
  paid: number;
}
interface SingleLineChartProps {
  date: string;
  count: number;
}

export function TwoLineChart({ data }: { data: GraphDataProps[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        // margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}

        {/* X axis mapped to your date/key */}
        <XAxis
          dataKey="date"
          // Render every tick
          interval={0}
          // Add breathing room
          padding={{ left: 15, right: 15 }}
          // Style the labels:
          tick={{
            fill: "#b0b0b0", // font color
            fontSize: 12, // font size in px
            fontFamily: "sans-serif",
          }}
          // Optionally style the axis line itself:
          axisLine={{ stroke: "#303030", strokeWidth: 0 }}
          // And the little tick marks:
          tickLine={{ stroke: "#303030", strokeWidth: 0 }}
        />

        {/* Y axis */}
        {/* <YAxis /> */}

        {/* Tooltip on hover */}
        {/* <Tooltip /> */}

        {/* Legend */}
        {/* <Legend verticalAlign="top" height={36} /> */}

        {/* First line */}
        <Line
          type="monotone"
          dataKey="free"
          name="Free"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />

        {/* Second line */}
        <Line
          type="monotone"
          dataKey="paid"
          name="Paid"
          stroke="#00c49f"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SingleLineChart({
  data,
  color,
}: {
  data: SingleLineChartProps[];
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        // margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}

        {/* X axis mapped to your date/key */}
        <XAxis
          dataKey="date"
          // Render every tick
          interval={0}
          // Add breathing room
          padding={{ left: 15, right: 15 }}
          // Style the labels:
          tick={{
            fill: "#b0b0b0", // font color
            fontSize: 12, // font size in px
            fontFamily: "sans-serif",
          }}
          // Optionally style the axis line itself:
          axisLine={{ stroke: "#303030", strokeWidth: 0 }}
          // And the little tick marks:
          tickLine={{ stroke: "#303030", strokeWidth: 0 }}
        />

        {/* Y axis */}
        {/* <YAxis /> */}

        {/* Tooltip on hover */}
        {/* <Tooltip /> */}

        {/* Legend */}
        {/* <Legend verticalAlign="top" height={36} /> */}

        {/* First line */}
        <Line
          type="monotone"
          dataKey="count"
          name="count"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
