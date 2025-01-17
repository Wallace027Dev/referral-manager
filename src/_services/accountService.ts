import { NextResponse } from "next/server";
import IUser from "@/_interfaces/IUser";
import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateUserLink from "@/_utils/generateUserLink";

class AccountService {
  async login({ whatsapp, password }: Partial<IUser>) {
    // Verifica se o whatsapp e a senha foram fornecidos
    if (!whatsapp || !password) {
      throw new Error("Whatsapp e senha são obrigatórios.");
    }
    
    try {
      // Verifica se o usuário existe no banco de dados
      const user = await prisma.user.findUnique({
        where: { whatsapp }
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      // Compara a senha fornecida com a senha armazenada no banco de dados
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Senha incorreta.");
      }

      // Gera um token JWT
      const token = jwt.sign(
        { id: user.id, name: user.name, whatsapp: user.whatsapp },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      // Retorna o token no corpo da resposta
      return NextResponse.json({ token, user });
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao fazer login.");
    }
  }

  async signup({ name, whatsapp, pix_key, password }: Partial<IUser>) {
    // Validação básica de campos obrigatórios
    if (!name || !whatsapp || !pix_key || !password) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    try {
      // Verifica se o whatsapp ou pix_key já existe
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ whatsapp }, { pix_key }]
        }
      });

      if (existingUser) {
        throw new Error(
          "Usuário já cadastrado com esse whatsapp ou chave PIX."
        );
      }

      // Criptografa a senha antes de armazenar
      const hashedPassword = await bcrypt.hash(password, 10);
      const linkId = await generateUserLink(name);

      // Cria o novo usuário no banco de dados
      const newUser = await prisma.user.create({
        data: {
          name,
          whatsapp,
          pix_key,
          link_id: linkId,
          password: hashedPassword
        }
      });

      // Retorna a resposta com os dados do usuário (sem a senha)
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao buscar usuários.");
    }
  }
}

const accountService = new AccountService();
export default accountService;
