import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_login: string;

  @Column()
  user_pass: string;

  @Column()
  user_fullname: string;

  @Column()
  user_role: string;

  @Column()
  user_email: string;

  @Column()
  user_activation_key: string;

  @Column()
  user_status: number;
}
