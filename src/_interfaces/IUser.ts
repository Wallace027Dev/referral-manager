import IClick from "./IClick";

interface IUser {
  id: number;
  name: string;
  pix_key: string;
  whatsapp: string;
  password: string;
  clicks: IClick[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export default IUser;