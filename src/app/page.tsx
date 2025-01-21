"use client";
import Image from "next/image";
import { Anchor, Footer, Header, Main } from "./style";
import mava from "@/_images/mava-logo.webp";
import motocycle from "@/_images/motocicleta.webp";
import instagram from "@/_images/instagram.png";

export default function Page() {
  return (
    <>
      <Header>
        <Image src={mava} alt="Logomarca Mava" />
        <Anchor href="/signup">Registrar-se</Anchor>
      </Header>
      <Main>
        <h1>
          <span>Proteja sua moto</span> com a segurança que ela merece!
        </h1>
        <p>
          Adquira agora o nossa proteção completa com benefícios que so a Mava
          tem para a sua motocicleta.
        </p>
        <Anchor href="/signup">Registrar-se</Anchor>
      </Main>
      <Footer>
        <Image src={motocycle} alt="Motocicleta na mudança de seção" />
        <div>
          <h2>Aqui na MAVA você tem benefícios de verdade para sua moto!</h2>
          <h3>Siga nossas redes</h3>
          <a href="https://www.instagram.com/mavaclube/" target="_blank">
            <Image src={instagram} alt="Instagram icon" />
          </a>
        </div>
      </Footer>
    </>
  );
}
