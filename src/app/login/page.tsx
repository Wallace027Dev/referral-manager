"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/_styles/AccountForm";
import validateLogin from "@/_validators/validateLogin";
import InputField from "@/_components/InputField";
import submitLogin, { LoginFormData } from "./submitLogin";

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

  return (
    <Form onSubmit={handleSubmit((data) =>
      submitLogin(data, setLoading, setMessage, router)
    )}>
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
