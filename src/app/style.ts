import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: var(--primary);
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1220px;
    width: 100%;
    margin: 0 auto;

    img {
      height: 40px;
      width: 160px;
      object-fit: contain;
    }
  }
`;

export const Anchor = styled.a`
  padding: 0.5rem 4rem;
  font-size: 1rem;
  color: var(--primary);
  background-color: var(--secondary);
  border: var(--secondary) solid 2.5px;
  border-radius: 2rem;
  font-weight: 600;

  &:hover {
    background-color: var(--font);
    color: var(--bg-color);
    transition: background-color 0.5s ease, color 0.5s ease;
  }
`;

export const Main = styled.main`
  flex: 1; // Permite que o Main ocupe o espaço restante
  max-width: 1220px;
  margin: 84px auto 0;
  padding: 0 1rem;
  text-align: start;

  h1 {
    font-size: 4rem;
    color: var(--secondary);

    span {
      font-weight: 900;
    }
  }

  p {
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

export const AboutSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1120px;
  margin-top: 10rem;

  img {
    width: 100%;
    max-width: 430px;
    height: auto;
    object-fit: contain;
  }

  div {
    max-width: 580px;
    color: var(--primary);

    span {
      font-weight: 700;
    }

    a {
      color: var(--bg-color);
      background-color: var(--primary);
      border: var(--secondary) solid 2.5px;
      border-radius: 2rem;
      font-weight: 600;
      padding: 0.5rem 4rem;

      &:hover {
        color: var(--secondary);
        transition: background-color 0.5s ease, color 0.5s ease;
      }
    }
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  color: var(--bg-color);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 420px;
  margin-top: auto;
  background: radial-gradient(
    circle,
    rgba(17, 29, 102, 1) 0%,
    rgba(0, 20, 75, 1) 100%
  );

  h3 {
    font-size: 2rem;
    font-weight: 700;
    max-width: 400px;
    margin-bottom: 2rem;
  }

  img {
    height: 95%;
    object-fit: contain;
  }

  div {
    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: var(--bg-color);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        background-color: var(--secondary);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;
