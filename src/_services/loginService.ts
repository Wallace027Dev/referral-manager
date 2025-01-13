import { NextResponse } from "next/server";
import IUser from "@/_interfaces/IUser";
import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginService {
  async login({ whatsapp, password }: Partial<IUser>) {
    try {
      // Verifica se o whatsapp e a senha foram fornecidos
      if (!whatsapp || !password) {
        return NextResponse.json(
          { message: "Whatsapp e senha são obrigatórios." },
          { status: 400 }
        );
      }

      // Verifica se o usuário existe no banco de dados
      const user = await prisma.user.findUnique({
        where: { whatsapp }
      });

      if (!user) {
        return NextResponse.json(
          { message: "Usuário não encontrado." },
          { status: 404 }
        );
      }

      // Compara a senha fornecida com a senha armazenada no banco de dados
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Senha incorreta." },
          { status: 401 }
        );
      }

      // Gera um token JWT
      const token = jwt.sign(
        { id: user.id, name: user.name, whatsapp: user.whatsapp },
        process.env.JWT_SECRET || "secret", // Armazenado em um .env para produção
        { expiresIn: "1h" }
      );

      // Retorna o token no corpo da resposta
      return NextResponse.json({ token });
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao buscar usuários.");
    }
  }
}

const loginService = new LoginService();
export default loginService;
