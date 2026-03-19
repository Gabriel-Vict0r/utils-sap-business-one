import { Router } from "express";
import { ApprovalController } from "../modules/approval/approval.controller";
import { routesAproval } from "../modules/approval/approval.routes";
import routesAuth from "../modules/auth/auth.routes";
const routes = Router();

routes.use("/approval", routesAproval);
routes.use("/auth", routesAuth);
export { routes };
