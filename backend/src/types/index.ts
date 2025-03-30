interface IUser {
  id_pk: number;
  uid: string;
  email: string;
  password: string;
  roleId: number;
  joinedAt: Date;
  total_points: number;
}
