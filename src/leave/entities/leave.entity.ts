import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @Column({ type: 'float' })
  numberOfDays: number;

  @Column()
  reason: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  submittedOn: Date;

  @Column({ default: 'Pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.leaveRequests)
  user: User;
}
