"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/_styles/AccountForm";

// Definindo o esquema de validação
const schema = yup.object().shape({
  whatsapp: yup
    .string()
    .trim()
    .matches(/^\d{10,11}$/, "O WhatsApp deve ter entre 10 e 11 dígitos.")
    .required("O WhatsApp é obrigatório."),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .required("A senha é obrigatória."),
});

type FormData = {
  whatsapp: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        router.push("/dashboard");
      } else {
        setMessage(result.message || "Erro ao realizar login.");
      }
    } catch (error) {
      setLoading(false);
      setMessage("Erro ao realizar login. Tente novamente.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input-whatsapp">WhatsApp:</label>
        <input
          type="tel"
          id="input-whatsapp"
          {...register("whatsapp")}
          placeholder="Seu número com DDD"
        />
        <p>{errors.whatsapp?.message}</p>
      </div>
      <div>
        <label htmlFor="input-password">Senha:</label>
        <input
          type="password"
          id="input-password"
          {...register("password")}
          placeholder="Sua senha"
        />
        <p>{errors.password?.message}</p>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      {message && <p>{message}</p>}
    </Form>
  );
}
