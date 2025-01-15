import { useState } from "react";
import { CopyButton, Heading } from "./style";
import IDashboardHeaderProps from "@/_interfaces/IDashboardHeaderProps";

export default function DashboardHeader({ userId }: IDashboardHeaderProps) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    const userLink = `${window.location.origin}/indications?userId=${userId}`;
    navigator.clipboard
      .writeText(userLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        alert("Erro ao copiar o link.");
      });
  }

  return (
    <header>
      <Heading>Minhas indicações</Heading>
      <CopyButton onClick={handleCopyLink} copied={copied}>
        {copied ? "Link Copiado!" : "Copiar Link"}
      </CopyButton>
    </header>
  );
}
