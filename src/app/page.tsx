"use client";
import Image from "next/image";
import { AboutSection, Anchor, Footer, Header, Main } from "./style";
import mava from "@/_images/mava-logo.webp";
import motocycle from "@/_images/motocicleta.webp";
import instagram from "@/_images/instagram.png";
import hero from "@/_images/hero.webp";

export default function Page() {
  const linkMava =
    "https://wa.me/557331911055?text=Vim%20atrav%C3%A9s%20do%20site%20www.mava.org.br%2C%20gostaria%20de%20saber%20mais%20e%20*simular%20um%20plano%20de%20prote%C3%A7%C3%A3o*%20para%20minha%20moto%2C%20Obrigado.";

  return (
    <>
      <Header>
        <div>
          <Image src={mava} alt="Logomarca Mava" />
          <Anchor href="/signup">Registrar-se</Anchor>
        </div>
      </Header>
      <Main>
        <section>
          <h1>
            <span>Proteja sua moto</span> com a segurança que ela merece!
          </h1>
          <p>
            Adquira agora a nossa proteção completa com benefícios que só a Mava
            tem para a sua motocicleta.
          </p>
          <Anchor href="/signup">Registrar-se</Anchor>
        </section>
        <AboutSection>
          <Image src={hero} alt="Ilustração da seção sobre a Mava Motos" />
          <div>
            <p>
              Por que escolher a <span>Mava Motos?</span>
            </p>
            <h2>Garantia de segurança, assistência e economia.</h2>

            <p>
              A nossa proteção veicular garante segurança e tranquilidade para
              proprietários de motos contra furto, roubo, incêndio, acidentes e
              danos variados. Oferecemos assistência 24 horas para resolver
              rapidamente situações desagradáveis no trânsito, sem prejudicar
              sua vida pessoal e profissional.
            </p>

            <a href={linkMava} target="_blank" rel="noopener noreferrer">
              Fale com a Mava
            </a>
          </div>
        </AboutSection>
      </Main>
      <Footer>
        <Image src={motocycle} alt="Motocicleta ilustrando a seção final" />
        <div>
          <h3>Aqui na MAVA você tem benefícios de verdade para sua moto!</h3>
          <h4>Siga nossas redes</h4>
          <a
            href="https://www.instagram.com/mavaclube/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={instagram} alt="Ícone do Instagram" />
          </a>
        </div>
      </Footer>
    </>
  );
}
