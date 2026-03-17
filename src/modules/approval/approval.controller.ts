import { Request } from "express";
import { Response } from "express";
import { ApprovalService } from "./approval.service";

export class ApprovalController {
  async getApproversByStepCode(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const { stepCode } = req.params;
      const stepCodeNum = Number(stepCode);
      if (isNaN(stepCodeNum) || stepCodeNum < -32768 || stepCodeNum > 32767) {
        return res.status(400).json({
          error:
            "Código de etapa inválido ou fora do range permitido para SMALLINT",
        });
      }

      const approvers = await service.getApprovers(stepCodeNum);
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
      const stepCodeNum = Number(stepCode);
      const userIdNum = Number(userId);
      if (isNaN(stepCodeNum) || stepCodeNum < -32768 || stepCodeNum > 32767) {
        return res.status(400).json({
          error:
            "Código de etapa inválido ou fora do range permitido para SMALLINT",
        });
      }
      if (isNaN(userIdNum) || userIdNum < -32768 || userIdNum > 32767) {
        return res.status(400).json({
          error:
            "ID de usuário inválido ou fora do range permitido para SMALLINT",
        });
      }
      const result = await service.insertApproval(stepCodeNum, userIdNum);
      return res.json(result);
    } catch (error) {
      console.error("Erro ao inserir aprovação:", error);
      return res.status(500).json({ error: "erro ao inserir aprovação" });
    }
  }
  async removeApproval(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const { stepCode, userId } = req.body;
      const stepCodeNum = Number(stepCode);
      const userIdNum = Number(userId);
      if (isNaN(stepCodeNum) || stepCodeNum < -32768 || stepCodeNum > 32767) {
        return res.status(400).json({
          error:
            "Código de etapa inválido ou fora do range permitido para SMALLINT",
        });
      }
      if (isNaN(userIdNum) || userIdNum < -32768 || userIdNum > 32767) {
        return res.status(400).json({
          error:
            "ID de usuário inválido ou fora do range permitido para SMALLINT",
        });
      }
      const result = await service.removeApproval(stepCodeNum, userIdNum);
      return res.json(result);
    } catch (error) {
      console.error("Erro ao remover aprovação:", error);
      return res.status(500).json({ error: "erro ao remover aprovação" });
    }
  }
}
