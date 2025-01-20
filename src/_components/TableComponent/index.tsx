import IClick from "@/_interfaces/IClick";
import { Table, TableBody, TableHeader } from "./style";
import React from "react";

interface TableProps {
  isAdmin: boolean;
  clicks: IClick[];
}

const TableComponent: React.FC<TableProps> = ({ isAdmin, clicks }) => {
  // Agrupa os cliques pelo user_id
  const groupedClicks = isAdmin
    ? clicks.reduce((acc, click) => {
        if (!acc[click.user_id]) {
          acc[click.user_id] = [];
        }
        acc[click.user_id].push(click);
        return acc;
      }, {} as Record<string, IClick[]>)
    : null;

  return (
    <Table>
      <TableHeader>
        <tr>
          <th>Contato</th>
          <th>Data do Clique</th>
        </tr>
      </TableHeader>
      <TableBody>
        {isAdmin && groupedClicks
          ? Object.keys(groupedClicks).map((userId) => {
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
                        paddingLeft: "15px"
                      }}
                    >
                      {`Usuário ID: ${userId} - Total de Cliques: ${totalClicks}`}
                    </td>
                  </tr>
                  {groupedClicks[userId].map((click) => (
                    <tr key={click.id}>
                      <td>{click.contact}</td>
                      <td>
                        {new Date(click.clicked_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })
          : clicks.map((click) => (
              <tr key={click.id}>
                <td>{click.contact}</td>
                <td>
                  {new Date(click.clicked_at).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
