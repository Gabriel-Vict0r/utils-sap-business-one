import { Request } from "express";
import { Response } from "express";
import { ApprovalService } from "./approval.service";

export class ApprovalController {
  async getApproversByStepCode(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const { stepCode } = req.params;
      console.log(stepCode);
      const approvers = await service.getApprovers(Number(stepCode));
      console.log("Approvers fetched successfully:", approvers);
      return res.json(approvers);
    } catch (error) {
      console.error("Error fetching approvers:", error);
      return res.status(500).json({ error: "erro ao buscar os aprovadores" });
    }
  }

  async syncOriginators(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const result = await service.syncOriginators();
      if (result) {
        console.log(`Originadores incluídos com sucesso ${result}.`);
      } else {
        console.log("Não há originadores para inserir nos modelos.");
      }
      return res.json(result);
    } catch (error) {
      console.error("Erro ao sincronizar originadores:", error);
      return res
        .status(500)
        .json({ error: "erro ao sincronizar os originadores" });
    }
  }

  async getStepsWithApprover(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const result = await service.getStepsWithApprover();
      return res.json(result);
    } catch (error) {
      console.error("Erro ao buscar etapas com aprovadores:", error);
      return res
        .status(500)
        .json({ error: "erro ao buscar etapas com aprovadores" });
    }
  }

  async getUsers(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const result = await service.getUsers();
      return res.json(result);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "erro ao buscar usuários" });
    }
  }

  async insertApproval(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const { stepCode, userId } = req.body;
      const result = await service.insertApproval(
        Number(stepCode),
        Number(userId),
      );
      return res.json(result);
    } catch (error) {
      console.error("Erro ao inserir aprovação:", error);
      return res.status(500).json({ error: "erro ao inserir aprovação" });
    }
  }
}
