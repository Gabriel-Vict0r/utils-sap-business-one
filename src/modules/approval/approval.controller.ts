import { Request } from "express";
import { Response } from "express";
import { ApprovalService } from "./approval.service";

export class ApprovalController {

  
  async getApproversByStepCode(req: Request, res: Response) {
    const service = new ApprovalService();
    try {
      const {stepCode} = req.params;
      console.log(stepCode);
      const approvers = await service.getApprovers(Number(stepCode));
      console.log('Approvers fetched successfully:', approvers);
      return res.json(approvers);
    } catch (error) {
      console.error('Error fetching approvers:', error);
      return res.status(500).json({ error: 'erro ao buscar os aprovadores' });
    }
  };
}