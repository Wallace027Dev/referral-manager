"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
// Importa os tipos de dados e funções utilitárias
import IClick from "@/_interfaces/IClick";
import IUser from "@/_interfaces/IUser";
import getStartAndEndDate from "@/_utils/getStartAndEndDate";
import DashboardHeader from "@/_components/DashboardHeader";
// Importa componentes de UI reutilizáveis
import { DashboardContainer, NoDataMessage } from "./style";
import ClickDataSection from "@/_components/ClickDataSection";
import UserDataSection from "@/_components/UserDataSection";

// Função principal do componente de Dashboard
const Dashboard: React.FC = () => {
  const [clicks, setClicks] = useState<IClick[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredClicks, setFilteredClicks] = useState<IClick[]>([]);
  const [activeFilter, setActiveFilter] = useState("total");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentForm, setCurrentForm] = useState<"clicks" | "users">("clicks");
  // Pega o parâmetro 'id' da URL (usado para diferenciar o comportamento de visualização)
  const { id } = useParams<{ id: string }>();
  // Função assíncrona para buscar dados do backend (cliques ou usuários)
  const fetchData = useCallback(async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const endpoint =
        isAdmin && currentForm === "users"
          ? "/api/users"
          : `/api/${currentForm}/${isAdmin ? "" : id}`;
      const response = await fetch(`${baseUrl}${endpoint}`);
      if (!response.ok) throw new Error("Erro ao buscar dados");

      const data = await response.json();
      
      currentForm === "clicks" ? setClicks(data) : setUsers(data);
      setFilteredClicks(currentForm === "clicks" ? data : []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [isAdmin, currentForm, id]);

  useEffect(() => {
    setIsAdmin(id === "admin");
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterClicksByDate = useCallback(
    (monthsAgo: number) => {
      if (currentForm !== "clicks") return;

      const { startDate, endDate } = getStartAndEndDate(monthsAgo);
      const filteredData = clicks.filter((click) => {
        const clickDate = new Date(click.clicked_at);
        return clickDate >= startDate && clickDate <= endDate;
      });

      setFilteredClicks(filteredData);
      setActiveFilter(`${monthsAgo}m`);
    },
    [clicks, currentForm]
  );

  const showTotalClicks = useCallback(() => {
    if (currentForm === "clicks") setFilteredClicks(clicks);
    setActiveFilter("total");
  }, [clicks, currentForm]);

  const handleCurrentFormToggle = useCallback(() => {
    setCurrentForm((prevForm) => (prevForm === "clicks" ? "users" : "clicks"));
  }, []);

  return (
    <>
      <DashboardHeader
        currentForm={currentForm}
        handleCurrentForm={handleCurrentFormToggle}
        isAdmin={isAdmin}
        userId={id}
      />
      <DashboardContainer>
        {(currentForm === "clicks" ? clicks : users).length > 0 ? (
          <>
            {currentForm === "clicks" ? (
              <ClickDataSection
                activeFilter={activeFilter}
                filterClicksByDate={filterClicksByDate}
                showTotalClicks={showTotalClicks}
                filteredClicks={filteredClicks}
              />
            ) : (
              <UserDataSection users={users} />
            )}
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
};

export default Dashboard;
