import IUser from "@/_interfaces/IUser";
import TableComponent from "../TableComponent";

const UserDataSection: React.FC<{
  users: IUser[];
}> = ({ users }) => (
  <TableComponent
    isAdmin={true}
    data={users}
    currentForm="users"
  />
);

export default UserDataSection;