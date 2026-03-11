import { ApprovalRepository } from "./approval.repository";



export class ApprovalService {

  private repository = new ApprovalRepository();
  async getApprovers(stepCode: number) {
    // Implementation for fetching approvers based on step code
    if (!stepCode) {
      throw new Error('Código de etapa é obrigatório');
    }
    return this.repository.findApproversByStepCode(stepCode);
  }
}