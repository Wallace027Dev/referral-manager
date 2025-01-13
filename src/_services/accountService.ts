import { NextResponse } from "next/server";
import IUser from "@/_interfaces/IUser";
import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AccountService {
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

  async signup({ name, whatsapp, pix_key, password }: Partial<IUser>) {
    // Validação básica de campos obrigatórios
    if (!name || !whatsapp || !pix_key || !password) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    try {
      // Verifica se o whatsapp ou pix_key já existe
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ whatsapp }, { pix_key }]
        }
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "Usuário já cadastrado com esse whatsapp ou pix_key." },
          { status: 400 }
        );
      }

      // Criptografa a senha antes de armazenar
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o novo usuário no banco de dados
      const newUser = await prisma.user.create({
        data: {
          name,
          whatsapp,
          pix_key,
          password: hashedPassword
        }
      });

      // Retorna a resposta com os dados do usuário (sem a senha)
      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao buscar usuários.");
    }
  }
}

const accountService = new AccountService();
export default accountService;
