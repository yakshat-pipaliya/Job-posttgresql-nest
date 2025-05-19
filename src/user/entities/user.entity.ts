import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from  '../../common/message';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  Name: string;

  @Column({ unique: true, nullable: false })
  Email: string;

  @Column({ nullable: false })
  Password: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  PhoneNo: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  Role: UserRole;
}
