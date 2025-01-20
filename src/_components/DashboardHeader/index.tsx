import { useState } from "react";
import { CopyButton, Header, Heading, Nav } from "./style";
import IDashboardHeaderProps from "@/_interfaces/IDashboardHeaderProps";
import { usePathname } from "next/navigation";

export default function DashboardHeader({
  isAdmin,
  userId
}: IDashboardHeaderProps) {
  const pathname = usePathname ();
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
        <Nav>
          <a
            href="/dashboard/admin"
            className={pathname === "/dashboard/admin" ? "active" : ""}
          >
            Indicações
          </a>
          <a href="/users" className={pathname === "/users" ? "active" : ""}>
            Usuários
          </a>
        </Nav>
      )}
    </Header>
  );
}
