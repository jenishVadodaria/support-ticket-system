import { useState } from "react";
import AgentModal from "../../components/AgentModal/AgentModal";
import AgentTable from "../../components/AgentTable/AgentTable";

const AgentPage = () => {
  const [createAgentModalShow, setCreateAgentModalShow] =
    useState<boolean>(false);
  const [refreshTableData, setRefreshTableData] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      <button
        className="relative rounded-lg px-4 py-2 text-white shadow-lg transition duration-200 hover:shadow-primary-hover
        bg-[#FF5A00]"
        onClick={() => setCreateAgentModalShow(true)}
      >
        Create Agent
      </button>

      {createAgentModalShow && (
        <AgentModal
          setCreateAgentModalShow={setCreateAgentModalShow}
          createAgentModalShow={createAgentModalShow}
          setRefreshTableData={setRefreshTableData}
          refreshTableData={refreshTableData}
        />
      )}
      <div className="mt-16"></div>
      <AgentTable refreshTableData={refreshTableData} />
    </div>
  );
};

export default AgentPage;
