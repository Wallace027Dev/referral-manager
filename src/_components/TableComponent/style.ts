import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  border: 0.5px solid var(--primary);

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border: none;
  }
`;

export const TableHeader = styled.thead`
  background-color: var(--primary);

  th {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    color: var(--bg-color);
    border-bottom: 2px solid var(--primary);
  }

  @media (max-width: 768px) {
    th {
      padding: 0.5rem 1rem;
    }
  }

  @media (max-width: 768px) {
    th {
      font-size: 0.75rem;
    }
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }

  .td_separator {
    color: "#f9f9f9";
    font-weight: bold;
    text-align: left;
    background-color: var(--secondary);
    padding-left: 15px;
  }

  td {
    padding: 0.8rem;
    text-align: center;
    border-bottom: 1px solid var(--primary);

    @media (max-width: 768px) {
      padding: 0.5rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    display: block;

    tr {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      border: 1px solid var(--primary);
      border-radius: 0.5rem;
    }

    width: 100%;
    td {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
    }

    td::before {
      content: attr(data-label);
      font-weight: bold;
      color: var(--primary);
      margin-right: 0.5rem;
    }
  }
`;
