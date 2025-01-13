"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/_styles/AccountForm";
import validateLogin from "@/_validators/validateLogin";
import InputField from "@/_components/InputField";

type FormData = {
  whatsapp: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validateLogin)
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const { message } = await response.json();
        setMessage(message || "Erro ao realizar login.");
      }
    } catch {
      setMessage("Erro ao realizar login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="input-whatsapp"
        label="WhatsApp"
        type="tel"
        placeholder="Seu número com DDD"
        error={errors.whatsapp?.message}
        {...register("whatsapp")}
      />
      <InputField
        id="input-password"
        label="Senha"
        type="password"
        placeholder="Sua senha"
        error={errors.password?.message}
        {...register("password")}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
      {message && <p>{message}</p>}
    </Form>
  );
}
