import { useState } from "react";
import { CopyButton, Header, Heading, FormOptionButton } from "./style";
import IDashboardHeaderProps from "@/_interfaces/IDashboardHeaderProps";

export default function DashboardHeader({
  isAdmin,
  userId,
  currentForm,
  handleCurrentForm
}: IDashboardHeaderProps) {
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
    <Header>
      <div>
        <p>Logo</p>
        <Heading>{isAdmin ? "Bem-vinda Mava" : "Minhas indicações"}</Heading>
      </div>
      {!isAdmin ? (
        <CopyButton onClick={handleCopyLink} copied={copied}>
          {copied ? "Link Copiado!" : "Copiar Link"}
        </CopyButton>
      ) : (
        <FormOptionButton>
          <button
            onClick={handleCurrentForm}
            className={currentForm === "clicks" ? "active" : ""}
          >
            Indicações
          </button>
          <button
            onClick={handleCurrentForm}
            className={currentForm === "users" ? "active" : ""}
          >
            Usuários
          </button>
        </FormOptionButton>
      )}
    </Header>
  );
}
