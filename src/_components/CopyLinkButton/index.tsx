import CopyButton from "./style";

const CopyLinkButton: React.FC<{ userId: string; copied: boolean; onCopy: () => void }> = ({ userId, copied, onCopy }) => {
  return (
    <CopyButton onClick={onCopy} copied={copied}>
      {copied ? "Link Copiado!" : "Copiar Link"}
    </CopyButton>
  );
};

export default CopyLinkButton;