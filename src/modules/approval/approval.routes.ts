import { Router } from "express";
import { ApprovalController } from "../approval/approval.controller";

const routesAproval = Router(); 

routesAproval.get('/ping', (req, res) => {
  res.send('pong');
});

routesAproval.get('/:stepCode/approvers', // Rota para obter os aprovadores com base no código da etapa
  new ApprovalController().getApproversByStepCode
)

export {routesAproval};