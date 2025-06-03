import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SystemUptimeContent({ data }) {
  // Transform the data for the chart
  const transformedData =
    data?.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      uptime: item.uptimePercentage,
    })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-neutral-200">
          <p className="text-sm text-gray-600">{`Date: ${label}`}</p>
          <p className="text-sm text-gray-600">{`Uptime: ${payload[0].value.toFixed(
            2
          )}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-72 p-4">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={transformedData}
            margin={{ top: 30, right: 20, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#cacaca"
              strokeDasharray="5 0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#bababa"
              tick={{ fontSize: 10, dx: 0, dy: 10, textAnchor: "start" }}
              interval="preserveStartEnd"
              minTickGap={10}
            />
            <YAxis
              stroke="#bababa"
              strokeDasharray="0 1"
              tick={{ fontSize: 10 }}
              width={40}
              domain={[90, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="linear"
              dataKey="uptime"
              stroke="#4ADE80"
              strokeWidth={3}
              dot={false}
              fill="url(#colorUptime)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
