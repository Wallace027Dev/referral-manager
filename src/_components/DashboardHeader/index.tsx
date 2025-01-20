import { useState, useCallback } from "react";

import IDashboardHeaderProps from "@/_interfaces/IDashboardHeaderProps";
import {  Header } from "./style";
import CopyLinkButton from "../CopyLinkButton";
import HeaderContent from "../HeaderContent";
import FormOptionButtons from "../FormOptionButton";

const DashboardHeader: React.FC<IDashboardHeaderProps> = ({ isAdmin, userId, currentForm, handleCurrentForm }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    const userLink = `${window.location.origin}/indications?userId=${userId}`;
    navigator.clipboard
      .writeText(userLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => alert("Erro ao copiar o link."));
  }, [userId]);

  return (
    <Header>
      <HeaderContent isAdmin={isAdmin} />
      {!isAdmin ? (
        <CopyLinkButton userId={userId} copied={copied} onCopy={handleCopyLink} />
      ) : (
        <FormOptionButtons currentForm={currentForm} handleCurrentForm={handleCurrentForm} />
      )}
    </Header>
  );
};

export default DashboardHeader;
