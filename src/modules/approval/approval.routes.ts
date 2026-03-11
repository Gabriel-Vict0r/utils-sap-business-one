import { Router } from "express";
import { ApprovalController } from "../approval/approval.controller";

const routesAproval = Router(); 

routesAproval.get('/ping', (req, res) => {
  res.send('pong');
});

routesAproval.get('/:stepCode/approvers', 
  new ApprovalController().handle
)

export {routesAproval};