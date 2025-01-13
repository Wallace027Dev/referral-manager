interface IUser {
  id: string;
  name: string;
  pixKey: string;
  whatsapp: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export default IUser;