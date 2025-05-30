"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Header, Main } from "./style";
import { useClickRegistration } from "./useClickRegistration";
import AccountForm from "../../_styles/AccountForm";
import InputField from "@/_components/InputField";

import logo from "@/_images/mava-logo.webp"
import Image from "next/image";

export default function DashboardHeader() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    isValid,
    errorMessage,
    registerClick
  } = useClickRegistration(userId, phoneNumber);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerClick();
  };
  
  return (
    <>
      <Header>
        <Image src={logo} alt="Logomarca Mava" height={64} />
      </Header>
      <Main>
        <AccountForm onSubmit={handleSubmit}>
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
        </AccountForm>
      </Main>
    </>
  );
}
