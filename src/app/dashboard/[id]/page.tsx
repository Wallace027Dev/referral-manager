"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import IClick from "@/_interfaces/IClick";
import getStartAndEndDate from "@/_utils/getStartAndEndDate";
import TableComponent from "@/_components/TableComponent";
import FilterButtons from "@/_components/FilterButtons";
import DashboardHeader from "@/_components/DashboardHeader";

import {
  DashboardContainer,
  NoDataMessage
} from "../style";

export default function Home() {
  const [clicks, setClicks] = useState<IClick[]>([]);
  const [filteredClicks, setFilteredClicks] = useState<IClick[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("total");

  const { id } = useParams<{ id: string }>();

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
        setFilteredClicks(data);
      } catch (error) {
        console.error("Erro ao buscar cliques:", error);
      }
    }

    getClicks();
  }, [id]);

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
      <DashboardHeader userId={id} />
      <DashboardContainer>
        {clicks.length > 0 ? (
          <>
            <FilterButtons
              activeFilter={activeFilter}
              onFilterClick={filterClicksByDate}
              onShowTotalClicks={showTotalClicks}
            />
            <TableComponent clicks={filteredClicks} />
          </>
        ) : (
          <NoDataMessage>Não há cliques registrados ainda.</NoDataMessage>
        )}
      </DashboardContainer>
    </>
  );
}
