import IClick from "@/_interfaces/IClick";
import { Table, TableBody, TableHeader } from "./style";

interface TableProps {
  clicks: IClick[];
}

const TableComponent: React.FC<TableProps> = ({ clicks }) => (
  <Table>
    <TableHeader>
      <tr>
        <th>Contato</th>
        <th>Data do Clique</th>
      </tr>
    </TableHeader>
    <TableBody>
      {clicks.map((click) => (
        <tr key={click.id}>
          <td>{click.contact}</td>
          <td>{new Date(click.clicked_at).toLocaleDateString("pt-BR")}</td>
        </tr>
      ))}
    </TableBody>
  </Table>
);

export default TableComponent;
