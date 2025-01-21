import styled from "styled-components";

export const Header = styled.header`
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  gap: 700px;

  img {
    width: 160px;
    object-fit: contain;
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
    transition: .5s;
  }
`;

export const Main = styled.main`
  max-width: 720px;
  margin: 84px auto;
  text-align: start;
  h1 {
    font-size: 3rem;
    color: var(--secondary);

    span {
      font-weight: 900;
    }
  }

  p {
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 420px;
  width: 100vw;
  color: var(--bg-color);
  background: rgb(17, 29, 102);
  background: radial-gradient(
    circle,
    rgba(17, 29, 102, 1) 0%,
    rgba(17, 29, 102, 1) 35%,
    rgba(0, 20, 75, 1) 100%
  );

  h2 {
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
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--secondary);
      }

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;
