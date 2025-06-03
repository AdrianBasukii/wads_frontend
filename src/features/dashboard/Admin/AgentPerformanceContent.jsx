import DonutChart from "../DonutChart";

export default function AgentPerformanceContent({ data }) {
  const { assignedTo, ticketsResolved, avgResponseTime, customerSatisfaction } =
    data;

  return (
    <div className="p-4 h-72 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          {assignedTo.firstName} {assignedTo.lastName}
        </h3>
        <p className="text-sm text-gray-500">Agent ID: {assignedTo.userId}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500 mb-1">Tickets Resolved</p>
          <p className="text-2xl font-semibold text-blue-600">
            {ticketsResolved}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500 mb-1">Avg. Response Time</p>
          <p className="text-2xl font-semibold text-blue-600">
            {avgResponseTime} min
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Customer Satisfaction</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${customerSatisfaction}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">
            {customerSatisfaction}%
          </span>
        </div>
      </div>
    </div>
  );
}
