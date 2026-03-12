import { StepWithApprover } from "../../types/approval.interfaces";
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
  async getStepsWithApprover() {
    const rows = await this.repository.findStepsWithApprover();

    const steps: any = [];

    rows.forEach((row: any) => {
      if (!steps[row.WstCode]) {
        steps[row.WstCode] = {
          stepCode: row.WstCode,
          stepName: row.Name,
          approvers: [],
        };
      }

      if (row.USERID) {
        steps[row.WstCode].approvers.push({
          userId: row.USERID,
          userCode: row.Usuario,
        });
      }
    });
    const result = Object.values(steps);
    //console.log(`etapas refatoradas: ${result}`);
    return result;
  }
}
