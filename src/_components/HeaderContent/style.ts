import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const Heading = styled.h1`
  padding: 1rem;
  font-size: 1.8rem;
  color: var(--primary);
`;
