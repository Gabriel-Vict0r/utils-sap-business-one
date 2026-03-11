import { Request } from "express";
import { Response } from "express";
import { ApprovalService } from "./approval.service";

export class ApprovalController {

  private service = new ApprovalService();
  async handle(req: Request, res: Response) { 
      try {
        const {stepCode} = req.params;
        const approvers = await this.service.getApprovers(Number(stepCode));
        return res.json(approvers);

      } catch (error) {
        console.error('Error fetching approvers:', error);
        return res.status(500).json({ error: 'erro ao buscar os aprovadores' });  
      }
  }
}