export interface AgentModalProps {
  setCreateAgentModalShow: (createAgentModalShow: boolean) => void;
  createAgentModalShow: boolean;
  setRefreshTableData: (refreshTableData: boolean) => void;
  refreshTableData: boolean;
}

export interface IFormData {
  name: string;
  email: string;
  phone: string;
  description: string;
}

export interface IErrors {
  name: string;
  email: string;
  phone: string;
  description: string;
  emailRegex: string;
  phoneLength: string;
}
