import CardTitle from "../CardTitle";
import AgentPerformanceContent from "./AgentPerformanceContent";
import AdminDropdown from "./AdminDropdown";
import Loader from "../../../components/loader/Loader";
import { useAdminDashboardContext } from "../../../contexts/AdminDashboardContext";
import { useState } from "react";

export default function AgentPerformanceCard() {
  const { agentPerformance, agentPerformanceLoading } =
    useAdminDashboardContext();
  let options;
  if (!agentPerformanceLoading)
    options = agentPerformance.performance.map((agent, index) => {
      const { firstName, lastName, userId } = agent.assignedTo;
      const shortId = userId.slice(-4);
      return {
        label: `${firstName} ${lastName} (#${shortId})`,
        value: index,
      };
    });

  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };

  if (agentPerformanceLoading) return <Loader />;

  return (
    <div className="bg-white rounded-sm shadow-md border border-neutral-200">
      <CardTitle title="Agent Performance">
        <div className="max-w-[250px] w-full">
          <AdminDropdown options={options} onChange={handleOptionChange} />
        </div>
      </CardTitle>
      <AgentPerformanceContent
        data={agentPerformance.performance[selectedOption]}
      />
    </div>
  );
}
