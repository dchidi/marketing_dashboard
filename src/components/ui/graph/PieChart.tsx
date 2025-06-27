import React from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// Define the shape of each data item
export interface PieData {
  name: string;
  value: number;
}

// Props for the PieChart component
export interface PieChartProps {
  data: PieData[];
  colors?: string[];
  outerRadius?: number | string;
  label?: boolean; // show labels
  labelStyle?: React.CSSProperties; // custom label text style
  tooltip?: boolean;
  legend?: boolean;
  paddingAngle?: number; // gap between slices in degrees
  cornerRadius?: number; // round slice edges
  chartMargin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  legendWrapperStyle?: React.CSSProperties; // custom legend container style
  legendTextStyle?: React.CSSProperties; // custom legend text style
}

export function PieChart({
  data,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"],
  outerRadius = "80%",
  label = false,
  labelStyle = { fontSize: 12, fill: "#b0b0b0" }, // default label style
  tooltip = true,
  legend = false,
  paddingAngle = 2,
  cornerRadius = 4,
  chartMargin = { bottom: 15 }, // space for legend
  legendWrapperStyle = { fontSize: 11 },
  legendTextStyle = { fontSize: 11, marginLeft: 10 },
}: PieChartProps) {
  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "k";
    return num.toString();
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart margin={chartMargin}>
        {tooltip && <Tooltip />}
        {legend && (
          <Legend
            verticalAlign="bottom"
            layout="horizontal"
            align="center"
            wrapperStyle={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              ...legendWrapperStyle,
            }}
            payload={data.map((entry, index) => ({
              id: entry.name,
              type: "circle",
              value: entry.name,
              color: colors[index % colors.length],
            }))}
            formatter={(value: string) => (
              <span style={legendTextStyle}>{value}</span>
            )}
          />
        )}

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={outerRadius}
          // apply label styling or disable labels
          // label={label ? labelStyle : false}
          label={
            label
              ? ({ value, cx, cy, midAngle, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 10;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill={labelStyle.fill || "#000"}
                      // textAnchor="bottom"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize={labelStyle.fontSize || 12}
                      fontWeight="bold"
                    >
                      {formatNumber(value)}
                    </text>
                  );
                }
              : false
          }
          stroke="none" // remove slice borders
          paddingAngle={paddingAngle} // gap between slices
          cornerRadius={cornerRadius} // round slice edges
        >
          {data.map((_: PieData, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
