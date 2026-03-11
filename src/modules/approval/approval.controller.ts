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
        console.log(`Successfully inserted ${result} missing originators.`);
      } else {
        console.log("No missing originators found to insert.");
      }
      return res.json(result);
    } catch (error) {
      console.error("Error syncing originators:", error);
      return res
        .status(500)
        .json({ error: "erro ao sincronizar os originadores" });
    }
  }
}
