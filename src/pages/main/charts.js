/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Charts({ data = [], opt = null, colors = COLORS }) {
  const [newData, setNewData] = useState([]);

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    // eslint-disable-next-line
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    // eslint-disable-next-line
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {newData[index].name} ({`${(percent * 100).toFixed(0)}%`})
      </text>
    );
  };

  useEffect(() => {
    opt === null
      ? setNewData(data)
      : setNewData(data.filter((d) => d.label === opt));
  }, [data, opt]);

  return (
    <>
      <div css={title}>성별 환자 수</div>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={newData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={CustomLabel}
        >
          {newData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
}

const title = css`
  font-size: 20px;
  font-weight: bold;
`;
