import { useState, useMemo } from "react";
import CardTitle from "../CardTitle";
import AdminDropdown from "./AdminDropdown";
import ResponseTimeContent from "./ResponseTimeContent";
import SystemUptimeContent from "./SystemUptimeContent";
import { useAdminDashboardContext } from "../../../contexts/AdminDashboardContext";

export default function PerformanceMetricsCard() {
  const {
    responseTime,
    responseTimeLoading,
    responseTimeError,
    serverUptime,
    serverUptimeLoading,
    serverUptimeError,
  } = useAdminDashboardContext();

  const options = useMemo(
    () => [
      { label: "Response Time", value: "Response Time" },
      { label: "System Uptime", value: "System Uptime" },
    ],
    []
  );

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleOptionChange = (newOption) => {
    if (newOption !== undefined) {
      setSelectedOption(newOption);
    }
  };

  return (
    <div className="bg-white rounded-sm shadow-md border border-neutral-200">
      <CardTitle title="Performance Metrics">
        <div className="max-w-[250px] w-full">
          <AdminDropdown
            options={options}
            onChange={handleOptionChange}
            value={selectedOption}
          />
        </div>
      </CardTitle>
      {selectedOption === "Response Time" && (
        <>
          {responseTimeLoading && (
            <div className="p-4 h-72 flex items-center justify-center">
              Loading...
            </div>
          )}
          {responseTimeError && (
            <div className="p-4 h-72 flex items-center justify-center text-red-500">
              Error loading data
            </div>
          )}
          {!responseTimeLoading && !responseTimeError && responseTime && (
            <ResponseTimeContent data={responseTime} />
          )}
          {!responseTimeLoading && !responseTimeError && !responseTime && (
            <div className="p-4 h-72 flex items-center justify-center text-gray-500">
              No response time data available
            </div>
          )}
        </>
      )}
      {selectedOption === "System Uptime" && (
        <>
          {serverUptimeLoading && (
            <div className="p-4 h-72 flex items-center justify-center">
              Loading...
            </div>
          )}
          {serverUptimeError && (
            <div className="p-4 h-72 flex items-center justify-center text-red-500">
              Error loading data
            </div>
          )}
          {!serverUptimeLoading && !serverUptimeError && serverUptime && (
            <SystemUptimeContent data={serverUptime} />
          )}
          {!serverUptimeLoading && !serverUptimeError && !serverUptime && (
            <div className="p-4 h-72 flex items-center justify-center text-gray-500">
              No system uptime data available
            </div>
          )}
        </>
      )}
      <button onClick={() => console.log(serverUptime)}>Test</button>
    </div>
  );
}
