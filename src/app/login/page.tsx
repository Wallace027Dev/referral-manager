"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/_styles/AccountForm";
import validateLogin from "@/_validators/validateLogin";
import LoginFormData from "@/_types/LoginFormData";
import InputField from "@/_components/InputField";
import submitLogin from "./submitLogin";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(validateLogin)
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setMessage(null);
    await submitLogin(data, setLoading, setMessage, router);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Logue-se</h1>
      <div>
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
      </div>
    </Form>
  );
}
