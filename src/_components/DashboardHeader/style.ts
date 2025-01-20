import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const Heading = styled.h1`
  padding: 1rem;
  font-size: 1.8rem;
  color: #007bff;
`;

export const Nav = styled.nav`
  a {
    color: #007bff;
    font-weight: 700;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 0;
      height: 2px;
      background: #007bff;
      transition: width 0.3s ease, transform 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }

  a + a {
    margin-left: 1rem;
  }
`;

export const CopyButton = styled.button<{ copied: boolean }>`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 0.9rem;
  background-color: ${({ copied }) => (copied ? "#28a745" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  min-width: 120px;
  cursor: pointer;

  &:hover {
    background-color: ${({ copied }) => (copied ? "#218838" : "#0056b3")};
  }

  ${({ copied }) =>
    copied &&
    `
    transform: scale(1.05);
    animation: bounce 0.3s ease-out;
  `}

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
