import Heading from "./style";

const HeaderContent: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => (
  <div>
    <p>Logo</p>
    <Heading>{isAdmin ? "Bem-vinda Mava" : "Minhas indicações"}</Heading>
  </div>
);

export default HeaderContent;
