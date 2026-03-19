import { Client } from "ldapts";

export class AuthService {
  async authenticate(username: string, password: string) {
    const client = new Client({
      url: process.env.AD_URL as string,
    });

    const userDN = `${process.env.AD_DOMAIN}\\${username}`;
    console.log(userDN);
    try {
      const result = await client.bind(userDN, password);
      console.log("Autenticação bem-sucedida:", result);
      return true; // Autenticação bem-sucedida
    } catch (error) {
      console.error("Erro de autenticação:", error);
      return false; // Falha na autenticação
    } finally {
      await client.unbind();
    }
  }
}
