import { ApprovalRepository } from "./approval.repository";

export class ApprovalService {
  private repository = new ApprovalRepository();
  async getApprovers(stepCode: number) {
    // Implementation for fetching approvers based on step code
    if (!stepCode) {
      throw new Error("Código de etapa é obrigatório");
    }
    const resRepository =
      await this.repository.findApproversByStepCode(stepCode);
    return resRepository;
  }

  async syncOriginators() {
    return await this.repository.insertMissingOriginators();
  }
}
