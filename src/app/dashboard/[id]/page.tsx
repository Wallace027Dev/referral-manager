"use client";
import IClick from "@/_interfaces/IClick";
import { useEffect, useState } from "react";
import {
  DashboardContainer,
  FilterButtons,
  Heading,
  NoDataMessage,
  Table,
  TableBody,
  TableHeader
} from "../style";
import { useParams } from "next/navigation";

export default function Home() {
  const [clicks, setClicks] = useState<IClick[]>([]);
  const [filteredClicks, setFilteredClicks] = useState<IClick[]>(clicks);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    async function getClicks() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/clicks/${id}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar cliques");
        }
        const data = await response.json();
        setClicks(data);
      } catch (error) {
        console.error("Erro ao buscar cliques:", error);
      }
    }

    getClicks();
  }, []);

  function filterClicksByDate(monthsAgo: number) {
    const currentDate = new Date();
  let startDate: Date;
  let endDate: Date;

  if (monthsAgo === 0) {
    // Para o filtro de "Este mês"
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  } else if (monthsAgo === 1) {
    // Para o filtro de "Mês anterior"
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1); // Primeiro dia do mês passado
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0); // Último dia do mês passado
  } else {
    // Para outros filtros, você pode ajustar conforme necessário
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthsAgo, 1);
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthsAgo + 1, 0);
  }

  const filteredData = clicks.filter((click) => {
    const clickDate = new Date(click.clicked_at);
    return clickDate >= startDate && clickDate <= endDate;
  });

  setFilteredClicks(filteredData);
  setActiveFilter(`${monthsAgo}m`);
  }

  // Alterna entre mostrar e não mostrar o total
  function showTotalClicks() {
    setFilteredClicks(clicks);
    setActiveFilter("total");
  }

  return (
    <DashboardContainer>
      <Heading>Minhas indicações</Heading>
      {clicks.length > 0 ? (
        <>
          <FilterButtons>
            <button
              onClick={() => filterClicksByDate(3)}
              className={activeFilter === "3m" ? "active" : ""}
            >
              3 meses atrás
            </button>
            <button
              onClick={() => filterClicksByDate(2)}
              className={activeFilter === "2m" ? "active" : ""}
            >
              2 meses atrás
            </button>
            <button
              onClick={() => filterClicksByDate(1)}
              className={activeFilter === "1m" ? "active" : ""}
            >
              1 mês atrás
            </button>
            <button
              onClick={() => filterClicksByDate(0)}
              className={activeFilter === "0m" ? "active" : ""}
            >
              Este mês
            </button>
            <button
              onClick={showTotalClicks}
              className={activeFilter === "total" ? "active" : ""}
            >
              Total Histórico
            </button>
          </FilterButtons>
          <Table>
            <TableHeader>
              <tr>
                <th>Contato</th>
                <th>Data do Clique</th>
              </tr>
            </TableHeader>
            <TableBody>
              {filteredClicks.map((click) => (
                <tr key={click.id}>
                  <td>{click.contact}</td>
                  <td>
                    {new Date(click.clicked_at).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <NoDataMessage>Não há cliques registrados ainda.</NoDataMessage>
      )}
    </DashboardContainer>
  );
}
