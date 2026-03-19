import jwt from "jsonwebtoken";
export function authMiddleware(req: any, res: any, next: any) {
  // Middleware para autenticação usando JWT
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token de autenticação ausente" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido" });
  }
}
