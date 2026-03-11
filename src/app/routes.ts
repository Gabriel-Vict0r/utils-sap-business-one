import { Router } from "express";
import { ApprovalController } from "../modules/approval/approval.controller";
import { routesAproval } from "../modules/approval/approval.routes";

const routes = Router(); 

routes.use('/approval', routesAproval);

export {routes};