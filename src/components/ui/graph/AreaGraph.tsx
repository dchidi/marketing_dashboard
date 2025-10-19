import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Skeleton from "../loading/skeleton";

type SeriesKey = string;

type AreaGraphProps = {
  data?: Record<string, unknown>[];
  xKey?: string;
  series?: SeriesKey[];
  height?: number;
  isLoading: boolean;
  colorPalette?: string[];
  // If true, use a solid fill with the same color as the stroke (with areaOpacity)
  solidFill?: boolean;
  areaOpacity?: number; // 0..1 when solidFill=true
  // Customize gradient behavior when solidFill is false
  gradientStartOpacity?: number; // default 0.9 (top)
  gradientEndOpacity?: number;   // default 0.0 (bottom)
};

// const palette = ["#8884d8", "#ff8042", "#ffc658", "#ff8042"];
// const palette = ["#82ca9d", "#8884d8", "#ffc658", "#ff8042"];
const AreaGraph: React.FC<AreaGraphProps> = ({
  data = [],
  xKey = "month",
  series = ["value"],
  height = 175,
  isLoading = true,
  colorPalette = ["#8884d8", "#ff8042", "#ffc658", "#ff8042"],
  solidFill = false,
  areaOpacity = 0.2,
  gradientStartOpacity = 0.9,
  gradientEndOpacity = 0.0,
}) => {
  // Create a per-instance unique prefix for gradient ids to avoid DOM id collisions
  // across multiple charts on the same page, and sanitize series keys for use in ids.
  const uid = (React as any).useId ? (React as any).useId() : Math.random().toString(36).slice(2);
  const makeId = (key: string) => `${uid}-area-fill-${String(key).replace(/[^A-Za-z0-9_-]/g, "_")}`;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        {isLoading ? (
          <Skeleton variant="dots" intervalMs={600} />
        ) : (
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 30, bottom: 0 }}
          >
            {!solidFill && (
              <defs>
                {series.map((key, idx) => {
                  const id = makeId(key);
                  const color = colorPalette[idx % colorPalette.length];
                  return (
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={gradientStartOpacity} />
                      <stop offset="95%" stopColor={color} stopOpacity={gradientEndOpacity} />
                    </linearGradient>
                  );
                })}
              </defs>
            )}

            {/* <CartesianGrid strokeDasharray="3 3" stroke="#bbb" vertical={false} /> */}
            <XAxis
              dataKey={xKey}
              stroke="#9ca3af"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />
            {/* <Legend wrapperStyle={{ fontSize: 12 }} /> */}
            {series.map((key, idx) => {
              const color = colorPalette[idx % colorPalette.length];
              const id = makeId(key);
              return (
                <Area
                  key={String(key)}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  fillOpacity={solidFill ? areaOpacity : 1}
                  fill={solidFill ? color : `url(#${id})`}
                  dot={{ r: 3 }}
                />
              );
            })}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
