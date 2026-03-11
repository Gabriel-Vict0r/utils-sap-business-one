import { Router } from "express";
import { ApprovalController } from "../approval/approval.controller";

const routesAproval = Router();

routesAproval.get("/ping", (req, res) => {
  res.send("pong");
});
const approvalController = new ApprovalController();
routesAproval.get(
  "/:stepCode/approvers", // Rota para obter os aprovadores com base no código da etapa
  approvalController.getApproversByStepCode,
);
routesAproval.post(
  "/sync-originators", // Rota para sincronizar os originadores
  approvalController.syncOriginators,
);

export { routesAproval };
