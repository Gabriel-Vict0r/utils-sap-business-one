import { Router } from "express";
import { ApprovalController } from "../approval/approval.controller";
import { routes } from "../../app/routes";

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

routesAproval.get(
  "/steps-with-approver", // Rota para obter etapas com aprovadores
  approvalController.getStepsWithApprover,
);

export { routesAproval };
