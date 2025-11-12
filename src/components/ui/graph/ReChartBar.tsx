import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function PetQuoteBarChart(q: any) {
  const data = q.data;
  const max = Math.max(...data.map((d: any) => d.value));
  const maxHeight = 250;

  const scaledData = data.map((item: any) => ({
    ...item,
    height: (item.value / max) * maxHeight,
    label:
      item.value >= 1000
        ? `${(item.value / 1000).toFixed(1)}k`
        : `${item.value}`,
  }));

  const colors = ["#f7931e", "#0090ff", "#9c8eff", "#00c49f"];

  return (
    <div className="bg-[#1f1f1f] p-4 rounded-xl w-full max-w-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={scaledData} barSize={40}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis hide />
          <Bar dataKey="height" radius={[6, 6, 0, 0]}>
            {scaledData.map((_: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <LabelList
              dataKey="label"
              position="top"
              style={{ fill: "white", fontWeight: "bold" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
