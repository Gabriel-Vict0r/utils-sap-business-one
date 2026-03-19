import { AuthService } from "./auth.service";
import { Request, Response } from "express";
export class AuthController {
  // Aqui você pode adicionar métodos para lidar com autenticação, como login, logout, etc.
  // Por exemplo:
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const authService = new AuthService();
    const isAuthenticated = await authService.authenticate(username, password);
  }
}
