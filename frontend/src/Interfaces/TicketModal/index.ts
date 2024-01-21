export enum Severity {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface TicketModalProps {
  setCreateTicketModalShow: (createTicketModalShow: boolean) => void;
  createTicketModalShow: boolean;
  setRefreshTableData: (refreshTableData: boolean) => void;
  refreshTableData: boolean;
}

export interface IFormState {
  topic: string;
  description: string;
  severity: Severity;
  type: string;
  resolvedOn: Date | string;
}

export interface IErrors {
  topic: string;
  description: string;
  severity: string;
  type: string;
}
