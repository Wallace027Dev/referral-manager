import IClick from "@/_interfaces/IClick";
import { Table, TableBody, TableHeader } from "./style";
import React from "react";
import IUser from "@/_interfaces/IUser";

interface TableProps {
  isAdmin: boolean;
  data: any;
  currentForm: string;
}

const TableComponent: React.FC<TableProps> = ({ isAdmin, data, currentForm }) => {
  const isClickData = data.length > 0 && "clicked_at" in data[0];

  // Função para agrupar os dados de clique por usuário (se for admin)
  const groupDataByUser = (data: IClick[] | IUser[]) => {
    return isAdmin && isClickData
      ? (data as IClick[]).reduce((acc, item) => {
          const userId = item.user_id;
          acc[userId] = acc[userId] ? [...acc[userId], item] : [item];
          return acc;
        }, {} as Record<string, IClick[]>)
      : data;
  };

  // Renderização de cliques (quando admin)
  const renderClicks = (groupedClicks: Record<string, IClick[]>) => {
    return Object.keys(groupedClicks).map((userId) => {
      const userClicks = groupedClicks[userId];
      const totalClicks = userClicks.length;

      return (
        <React.Fragment key={userId}>
          <tr>
            <td
              colSpan={2}
              style={{
                color: "#f9f9f9",
                fontWeight: "bold",
                textAlign: "left",
                backgroundColor: "var(--secondary)",
                paddingLeft: "15px",
              }}
            >
              {`Usuário ID: ${userId} - Total de Cliques: ${totalClicks}`}
            </td>
          </tr>
          {userClicks.map((item) => (
            <tr key={item.id}>
              <td>{item.contact}</td>
              <td>{new Date(item.clicked_at).toLocaleDateString("pt-BR")}</td>
            </tr>
          ))}
        </React.Fragment>
      );
    });
  };

  // Renderização de usuários (quando admin)
  const renderUsers = (users: IUser[]) => {
    return users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.whatsapp}</td>
        <td>{user.pix_key}</td>
        <td>{user.clicks.length}</td>
      </tr>
    ));
  };

  // Função para renderizar as linhas de dados
  const renderTableRows = (item: IClick | IUser) => {
    if (currentForm === "clicks") {
      return (
        <tr key={item.id}>
          <td>{(item as IClick).contact}</td>
          <td>{new Date((item as IClick).clicked_at).toLocaleDateString("pt-BR")}</td>
        </tr>
      );
    } else {
      return (
        <tr key={item.id}>
          <td>{(item as IUser).name}</td>
          <td>{(item as IUser).whatsapp}</td>
          <td>{(item as IUser).pix_key}</td>
          <td>{(item as IUser).clicks.length}</td>
        </tr>
      );
    }
  };

  // Agrupar os dados conforme o tipo
  const groupedData = groupDataByUser(data);

  return (
    <Table>
      <TableHeader>
        <tr>
          {currentForm === "clicks" ? (
            <>
              <th>Contato</th>
              <th>Data do Clique</th>
            </>
          ) : (
            <>
              <th>Nome</th>
              <th>WhatsApp</th>
              <th>Chave PIX</th>
              <th>Total de Cliques</th>
            </>
          )}
        </tr>
      </TableHeader>
      <TableBody>
        {isAdmin && groupedData
          ? isClickData
            ? renderClicks(groupedData as Record<string, IClick[]>)
            : renderUsers(groupedData as IUser[])
          : data.map((item: any) => renderTableRows(item))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
