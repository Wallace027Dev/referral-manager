"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import IClick from "@/_interfaces/IClick";
import getStartAndEndDate from "@/_utils/getStartAndEndDate";
import TableComponent from "@/_components/TableComponent";
import FilterButtons from "@/_components/FilterButtons";
import DashboardHeader from "@/_components/DashboardHeader";

import { DashboardContainer, NoDataMessage } from "./style";

export default function Home() {
  const [clicks, setClicks] = useState<IClick[]>([]);
  const [filteredClicks, setFilteredClicks] = useState<IClick[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("total");
  const [admin, setAdmin] = useState(false);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [id]);

  useEffect(() => {
    async function getClicks() {
      try {
        let response;

        if (admin) {
          response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/clicks` // Exemplo de URL que pode estar com problema
          );
        } else {
          response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/clicks/${id}`
          );
        }

        if (response.status === 404) {
          setClicks([]);
          setFilteredClicks([]);
          return;
        }

        if (!response.ok) {
          throw new Error("Erro ao buscar cliques");
        }

        const data = await response.json();
        setClicks(data);
        setFilteredClicks(data);
      } catch (error) {
        console.error("Erro ao buscar cliques:", error);
      }
    }

    getClicks();
  }, [admin, id]);

  function filterClicksByDate(monthsAgo: number) {
    const { startDate, endDate } = getStartAndEndDate(monthsAgo);

    const filteredData = clicks.filter((click) => {
      const clickDate = new Date(click.clicked_at);
      return clickDate >= startDate && clickDate <= endDate;
    });

    setFilteredClicks(filteredData);
    setActiveFilter(`${monthsAgo}m`);
  }

  function showTotalClicks() {
    setFilteredClicks(clicks);
    setActiveFilter("total");
  }

  return (
    <>
      {admin ? <header>Olá admin</header> : <DashboardHeader userId={id} />}
      <DashboardContainer>
        {clicks.length > 0 ? (
          <>
            <FilterButtons
              activeFilter={activeFilter}
              onFilterClick={filterClicksByDate}
              onShowTotalClicks={showTotalClicks}
            />
            <TableComponent isAdmin={admin} clicks={filteredClicks} />
          </>
        ) : (
          <NoDataMessage>Não há cliques registrados ainda.</NoDataMessage>
        )}
      </DashboardContainer>
    </>
  );
}
