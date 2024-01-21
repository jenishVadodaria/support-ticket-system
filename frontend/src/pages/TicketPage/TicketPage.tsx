import React, { useState } from "react";
import TicketModal from "../../components/TicketModal/TicketModal";
import TicketTable from "../../components/TicketTable/TicketTable";

const TicketPage = () => {
  const [createTicketModalShow, setCreateTicketModalShow] =
    useState<boolean>(false);
  const [refreshTableData, setRefreshTableData] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      <button
        className="relative rounded-lg px-4 py-2 text-white shadow-lg transition duration-200 hover:shadow-primary-hover
        bg-[#FF5A00]"
        onClick={() => setCreateTicketModalShow(true)}
      >
        Create Ticket
      </button>

      {createTicketModalShow && (
        <TicketModal
          setCreateTicketModalShow={setCreateTicketModalShow}
          createTicketModalShow={createTicketModalShow}
          setRefreshTableData={setRefreshTableData}
          refreshTableData={refreshTableData}
        />
      )}
      <div className="mt-16"></div>
      <TicketTable refreshTableData={refreshTableData} />
    </div>
  );
};

export default TicketPage;
