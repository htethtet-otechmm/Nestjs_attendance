import { Exclude, Expose } from 'class-transformer';
import { Leave } from 'src/leave/entities/leave.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
@Exclude()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password: string;

  @Expose()
  @Column({
    type: 'varchar',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Leave, (leave) => leave.user)
  leaveRequests: Leave[];
}
