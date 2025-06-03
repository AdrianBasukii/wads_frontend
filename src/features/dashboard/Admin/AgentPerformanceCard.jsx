import CardTitle from "../CardTitle";
import AgentPerformanceContent from "./AgentPerformanceContent";
import AdminDropdown from "./AdminDropdown";
import Loader from "../../../components/loader/Loader";
import { useAdminDashboardContext } from "../../../contexts/AdminDashboardContext";
import { useState, useMemo } from "react";

export default function AgentPerformanceCard() {
  const { agentPerformance, agentPerformanceLoading } =
    useAdminDashboardContext();
  const [selectedOption, setSelectedOption] = useState(0);

  // Safely create options array only when data is available
  const options = useMemo(() => {
    if (!agentPerformanceLoading && agentPerformance?.performance?.length > 0) {
      return agentPerformance.performance.map((agent, index) => {
        const { firstName, lastName, userId } = agent.assignedTo;
        const shortId = userId.slice(-4);
        return {
          label: `${firstName} ${lastName} (#${shortId})`,
          value: index,
        };
      });
    }
    return [{ label: "Loading...", value: 0 }];
  }, [agentPerformance, agentPerformanceLoading]);

  const handleOptionChange = (newOption) => {
    if (newOption !== undefined) {
      setSelectedOption(newOption);
    }
  };

  if (agentPerformanceLoading) return <Loader />;

  // Add safety check for data
  if (
    !agentPerformance?.performance ||
    agentPerformance.performance.length === 0
  ) {
    return (
      <div className="bg-white rounded-sm shadow-md border border-neutral-200 p-4">
        <CardTitle title="Agent Performance" />
        <div className="h-72 flex items-center justify-center">
          <p className="text-gray-500">No agent performance data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm shadow-md border border-neutral-200">
      <CardTitle title="Agent Performance">
        <div className="max-w-[250px] w-full">
          <AdminDropdown
            options={options}
            onChange={handleOptionChange}
            value={selectedOption}
          />
        </div>
      </CardTitle>
      <AgentPerformanceContent
        data={agentPerformance.performance[selectedOption]}
      />
    </div>
  );
}
