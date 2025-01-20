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

  const groupedData = isAdmin
    ? isClickData
      ? (data as IClick[]).reduce((acc, item) => {
          if (!acc[item.user_id]) {
            acc[item.user_id] = [];
          }
          acc[item.user_id].push(item);
          return acc;
        }, {} as Record<string, IClick[]>)
      : (data as IUser[])
    : null;

  // Renderização de cliques
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
                backgroundColor: "#4d90fe",
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

  // Renderização de usuários
  const renderUsers = (users: IUser[]) => {
    console.log(data)
    return users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.whatsapp}</td>
        <td>{user.pix_key}</td>
        <td>{user.clicks.length}</td>
      </tr>
    ));
  };

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
            : data.map((item: any) =>
          
              currentForm === "clicks" ? (
                <tr key={item.id}>
                  <td>{item.contact}</td>
                  <td>
                    {new Date(item.clicked_at).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.whatsapp}</td>
                  <td>{item.pix_key}</td>
                  <td>{item.clicks.length}</td>
                </tr>
              )
            )}
      </TableBody>
    </Table>
  );
};


export default TableComponent;
