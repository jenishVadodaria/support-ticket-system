interface ConstantsTypes {
  baseApiUrl: string;
  agentTableHeaderData: string[];
  ticketTableHeaderData: string[];
}

const getEnvString = (value: string | undefined): string => {
  if (value !== undefined) {
    return value.toString();
  }
  return "";
};

const agentTableHeaderData = [
  "Name",
  "Email",
  "Phone",
  "Description",
  "Created At",
  "Active",
  "",
];

const ticketTableHeaderData = [
  "Topic",
  "Description",
  "Severity",
  "Type",
  "Status",
  "Date-Created",
  "Resolved-On",
  "Assigned-To",
  "",
];

export const constants: ConstantsTypes = {
  baseApiUrl: getEnvString(import.meta.env.VITE_BACKEND_API_BASE_URL),
  agentTableHeaderData: agentTableHeaderData,
  ticketTableHeaderData: ticketTableHeaderData,
};
