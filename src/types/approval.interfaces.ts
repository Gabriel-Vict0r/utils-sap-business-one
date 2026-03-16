export interface StepWithApprover {
  WstCode: number;
  Name: string;
  USERID: number;
  Usuario: Array<{ id: number; Usuario: string }>;
}
export interface StepWithApproverResponse {
  WstCode: number;
  Name: string;
  USERID: number;
  Usuario: string;
}
export interface User {
  userId: string;
  userCode: string;
}
