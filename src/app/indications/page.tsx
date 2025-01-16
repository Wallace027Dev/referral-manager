"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Header, Main, Message } from "./style";
import InputField from "@/_components/InputField";

export default function DashboardHeader() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsValid(true);

    if (!userId) {
      setErrorMessage("ID do usuário não encontrado.");
      setIsValid(false);
      return;
    }

    try {
      const data = {
        user_id: userId,
        contact: phoneNumber
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/clicks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.message === "Clique registrado com sucesso.") {
          setErrorMessage("Seu link foi registrado com sucesso!");
          setIsValid(true);
        } else if (
          responseData.message ===
          "O número já está registrado para este usuário."
        ) {
          setErrorMessage("O número já foi registrado anteriormente.");
          setIsValid(false);
        } else {
          setErrorMessage("Operação realizada, mas resposta inesperada.");
          setIsValid(false);
        }
      } else {
        setErrorMessage("Houve um erro ao registrar o link.");
        setIsValid(false);
      }
    } catch (error) {
      setErrorMessage("Erro de rede, tente novamente mais tarde.");
      setIsValid(false);
    }
  }

  return (
    <>
      <Header>
        <h1>Bem-vindo à Mava</h1>
      </Header>
      <Main>
        <form onSubmit={handleSubmit}>
          <InputField
            id="whatsapp"
            label="Seu whatsapp"
            type="text"
            placeholder="(99) 99999-9999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={errorMessage}
            isValid={isValid}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Main>
    </>
  );
}
