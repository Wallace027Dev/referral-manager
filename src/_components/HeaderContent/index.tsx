import Image from "next/image";
import logo from "@/_images/mava-logo.webp";
import { HeaderContainer, Heading } from "./style";

const HeaderContent: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => (
  <HeaderContainer>
    <Image src={logo} alt="Logomarca Mava" height={64} />
    <Heading>{isAdmin ? "Bem-vinda Mava" : "Minhas indicações"}</Heading>
  </HeaderContainer>
);

export default HeaderContent;
