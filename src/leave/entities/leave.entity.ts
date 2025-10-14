import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  dates: string[];

  @Column()
  leaveType: string;

  @Column()
  mode: string;

  @Column()
  numberOfDays: number;

  @Column()
  reason: string;

  @Column()
  submittedOn: string;

  @Column()
  status: string;
}
