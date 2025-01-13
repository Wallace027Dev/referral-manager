"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ISignupData from "@/_interfaces/loginData";
import Form from "./style";

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  pix: yup.string().required("O Pix é obrigatório"),
  whatsapp: yup
    .string()
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

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: ISignupData) => {
    console.log("Dados enviados:", data);
    // Aqui você pode enviar os dados para uma API
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
        <input type="text" {...register("pix")} />
        <p>{errors.pix?.message}</p>
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

      <button type="submit">Cadastrar</button>
    </Form>
  );
}
