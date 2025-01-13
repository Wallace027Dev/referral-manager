"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "./style";

// Definindo o esquema de validação
const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  pixKey: yup.string().required("O Pix é obrigatório"),
  whatsapp: yup
    .string()
    .trim()
    .matches(/^\d{10,11}$/, "O WhatsApp deve ter entre 10 e 11 dígitos")
    .required("O WhatsApp é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória")
});

type FormData = {
  name: string;
  pixKey: string;
  whatsapp: string;
  password: string;
  confirmPassword: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Função que será chamada quando o formulário for enviado
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        router.replace("/login")
      } else {
        setMessage(result.message || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      setLoading(false);
      setMessage("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input type="text" {...register("name")} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="pix">Chave Pix:</label>
        <input type="text" {...register("pixKey")} />
        <p>{errors.pixKey?.message}</p>
      </div>
      <div>
        <label htmlFor="whatsapp">Whatsapp:</label>
        <input type="tel" {...register("whatsapp")} />
        <p>{errors.whatsapp?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirmação de senha:</label>
        <input type="password" {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      {message && <p>{message}</p>}
    </Form>
  );
}
