"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/_styles/AccountForm";
import validateSignup from "@/_validators/validateSignup";
import InputField from "@/_components/InputField";
import submitSignup, { SignupFormData } from "./submitSignup";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: yupResolver(validateSignup)
  });

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <Form
      onSubmit={handleSubmit((data) =>
        submitSignup(data, setLoading, setMessage, router)
      )}
    >
      <InputField
        id="name"
        label="Nome"
        type="text"
        placeholder="Seu nome completo"
        error={errors.name?.message}
        {...register("name")}
      />
      <InputField
        id="pixKey"
        label="Chave Pix"
        type="text"
        placeholder="Sua chave Pix"
        error={errors.pixKey?.message}
        {...register("pixKey")}
      />
      <InputField
        id="whatsapp"
        label="WhatsApp"
        type="tel"
        placeholder="Seu número com DDD"
        error={errors.whatsapp?.message}
        {...register("whatsapp")}
      />
      <InputField
        id="password"
        label="Senha"
        type="password"
        placeholder="Sua senha"
        error={errors.password?.message}
        {...register("password")}
      />
      <InputField
        id="confirmPassword"
        label="Confirmação de Senha"
        type="password"
        placeholder="Confirme sua senha"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
      {message && <p>{message}</p>}
    </Form>
  );
}
