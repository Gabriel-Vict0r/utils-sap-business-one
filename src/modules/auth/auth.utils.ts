import jwt from "jsonwebtoken";
export function generateToken(username: string) {
  return jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "8h",
  });
}
