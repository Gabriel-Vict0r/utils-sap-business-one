import { Request } from "express";
import { Response } from "express";
import { ApprovalService } from "./approval.service";
import { throwErrorTec } from "../../logger/base";

export class ApprovalController {
  async getApproversByStepCode(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const { stepCode } = req.params;
      const stepCodeNum = Number(stepCode);
      const approvers = await service.getApprovers(stepCodeNum);
      return res.json(approvers);
    } catch (error: Error | any) {
      return res
        .status(500)
        .json({
          error: "erro ao buscar os aprovadores",
          message: error.message,
        });
    }
  }

  async syncOriginators(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const result = await service.syncOriginators();
      return res.json({
        success: true,
        message: "Originadores sincronizados com sucesso",
      });
    } catch (error: Error | any) {
      return res.status(500).json({
        error: "erro ao sincronizar os originadores",
        message: error.message,
      });
    }
  }

  async getStepsWithApprover(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const result = await service.getStepsWithApprover();
      return res.json(result);
    } catch (error: Error | any) {
      return res.status(500).json({
        error: "erro ao buscar etapas com aprovadores",
        message: error.message,
      });
    }
  }

  async getUsers(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const result = await service.getUsers();
      return res.json(result);
    } catch (error: Error | any) {
      return res
        .status(500)
        .json({ error: "erro ao buscar usuários", message: error.message });
    }
  }

  async insertApproval(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const { stepCode, userId } = req.body;
      const stepCodeNum = Number(stepCode);
      const userIdNum = Number(userId);
      const result = await service.insertApproval(stepCodeNum, userIdNum);
      return res.json(result);
    } catch (error: Error | any) {
      return res
        .status(500)
        .json({ error: "erro ao inserir aprovação", message: error.message });
    }
  }
  async removeApproval(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const { stepCode, userId } = req.body;
      const result = await service.removeApproval(stepCode, userId);
      return res.json(result);
    } catch (error: Error | any) {
      return res
        .status(500)
        .json({ error: "erro ao remover aprovação", message: error.message });
    }
  }
}
