"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import IClick from "@/_interfaces/IClick";
import getStartAndEndDate from "@/_utils/getStartAndEndDate";
import TableComponent from "@/_components/TableComponent";
import FilterButtons from "@/_components/FilterButtons";
import DashboardHeader from "@/_components/DashboardHeader";

import { DashboardContainer, NoDataMessage } from "./style";
import IUser from "@/_interfaces/IUser";

export default function Home() {
  const [clicks, setClicks] = useState<IClick[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredClicks, setFilteredClicks] = useState<IClick[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("total");
  const [admin, setAdmin] = useState(false);
  const [currentForm, setCurrentForm] = useState("clicks");

  const { id } = useParams<{ id: string }>();

  function handleCurrentForm() {
    setCurrentForm((prevForm) => (prevForm === "clicks" ? "users" : "clicks"));
  }

  useEffect(() => {
    if (id == "admin") {
      console.log(id);
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [id, admin]);

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        let response;

        if (admin) {
          if (currentForm === "clicks") {
            response = await fetch(`${baseUrl}/api/clicks`);
            const fetchedData = await response.json();
            setClicks(fetchedData);
          } else if (currentForm === "users") {
            response = await fetch(`${baseUrl}/api/users`);
            const fetchedData = await response.json();
            console.log(fetchedData)
            setUsers(fetchedData);
          }
        } else {
          response = await fetch(`${baseUrl}/api/clicks/${id}`);
          const fetchedData = await response.json();
          setClicks(fetchedData);
        }

        if (response && !response.ok) {
          throw new Error("Erro ao buscar dados");
        }

        if (currentForm === "clicks") {
          setFilteredClicks(clicks as IClick[]);
        } else {
          setFilteredClicks([]);
        }
      } catch (error) {
        console.log(admin);
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [admin, id, currentForm]);

  const clicksData = filteredClicks.length > 0 ? filteredClicks : clicks;

  function filterClicksByDate(monthsAgo: number) {
    if (currentForm !== "clicks") return;

    const { startDate, endDate } = getStartAndEndDate(monthsAgo);

    const filteredData = (clicks as IClick[]).filter((click) => {
      const clickDate = new Date(click.clicked_at);
      return clickDate >= startDate && clickDate <= endDate;
    });

    setFilteredClicks(filteredData);
    setActiveFilter(`${monthsAgo}m`);
  }

  function showTotalClicks() {
    if (currentForm === "clicks") {
      setFilteredClicks(clicks as IClick[]);
    }
    setActiveFilter("total");
  }

  return (
    <>
      <DashboardHeader
        currentForm={currentForm}
        handleCurrentForm={handleCurrentForm}
        isAdmin={admin}
        userId={id}
      />
      <DashboardContainer>
        {clicks.length > 0 ? (
          <>
            {currentForm === "clicks" && (
              <FilterButtons
                activeFilter={activeFilter}
                onFilterClick={filterClicksByDate}
                onShowTotalClicks={showTotalClicks}
              />
            )}
            <TableComponent
              isAdmin={admin}
              data={currentForm === "clicks" ? clicksData : users}
              currentForm={currentForm}
            />
          </>
        ) : (
          <NoDataMessage>
            {currentForm === "clicks"
              ? "Não há cliques registrados ainda."
              : "Não há usuários registrados ainda."}
          </NoDataMessage>
        )}
      </DashboardContainer>
    </>
  );
}
