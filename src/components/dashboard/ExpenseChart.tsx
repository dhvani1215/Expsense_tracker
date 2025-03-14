
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Sector } from "recharts";
import { CATEGORIES, SAMPLE_TRANSACTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm font-semibold text-primary">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

interface ExpenseChartProps {
  chartType?: "bar" | "pie";
}

export const ExpenseChart = ({ chartType = "bar" }: ExpenseChartProps) => {
  const chartData = useMemo(() => {
    const transactions = SAMPLE_TRANSACTIONS;
    
    // Group by category and sum amounts
    const categorySums = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const current = categorySums.get(transaction.categoryId) || 0;
      categorySums.set(transaction.categoryId, current + transaction.amount);
    });
    
    // Convert to array of objects
    return Array.from(categorySums.entries()).map(([categoryId, amount]) => {
      const category = CATEGORIES.find(c => c.id === categoryId);
      return {
        name: category?.name || "Unknown",
        value: amount,
        color: category?.color.replace("bg-", "text-").replace("-500", "-400") || "text-gray-500"
      };
    });
  }, []);

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy-15} dy={8} textAnchor="middle" fill="#888" fontSize={12}>
          {payload.name}
        </text>
        <text x={cx} y={cy+15} dy={8} textAnchor="middle" fill="#333" fontSize={16} fontWeight={600}>
          ${value.toFixed(2)}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="card-elegant h-[350px] p-4">
      <h3 className="text-lg font-semibold mb-4">Spending By Category</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 15, bottom: 5 }}
              barSize={36}
            >
              <XAxis 
                dataKey="name" 
                scale="band" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} className={entry.color} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                activeIndex={0}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} className={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
