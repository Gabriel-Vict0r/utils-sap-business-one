import { Router } from "express";
import { ApprovalController } from "../approval/approval.controller";
import { routes } from "../../app/routes";
import {
  validateStepCode,
  validateStepCodeUserId,
} from "./approval.middleware";
import { authMiddleware } from "../auth/auth.middleware";

const routesAproval = Router();

routesAproval.get("/ping", (req, res) => {
  res.send("pong");
});
const approvalController = new ApprovalController();
routesAproval.get(
  "/:stepCode/approvers",
  authMiddleware,
  validateStepCode, // Rota para obter os aprovadores com base no código da etapa
  approvalController.getApproversByStepCode,
);
routesAproval.post(
  "/sync-originators", // Rota para sincronizar os originadores
  authMiddleware,
  approvalController.syncOriginators,
);

routesAproval.get(
  "/steps-with-approver", // Rota para obter etapas com aprovadores
  authMiddleware,
  approvalController.getStepsWithApprover,
);

routesAproval.get("/users", authMiddleware, approvalController.getUsers);

routesAproval.post(
  "/approvals", // Rota para inserir um novo aprovador para uma etapa
  authMiddleware,
  validateStepCodeUserId,
  approvalController.insertApproval,
);

routesAproval.delete(
  "/approvals", // Rota para remover um aprovador de uma etapa
  authMiddleware,
  validateStepCodeUserId,
  approvalController.removeApproval,
);
export { routesAproval };
