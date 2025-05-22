import { UserRole } from '../../common/message';

export interface IUser {
  id: number;
  Name: string;
  Email: string;
  Password: string;
  PhoneNo: string;
  Role: UserRole;
}
