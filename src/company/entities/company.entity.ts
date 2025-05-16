import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    CompanyName: string;

    @Column({ unique: true, nullable: false })
    Email: string;

    @Column({ unique: true, nullable: false, type: 'varchar' })
    ContactNo: string;

    @Column({ nullable: false })
    Location: string;
}
