import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './entities/leave.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
  ) {}

  async create(createLeaveDto: CreateLeaveDto, userId: number): Promise<Leave> {
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    const newLeave = this.leaveRepository.create({
      ...createLeaveDto,
      dates: createLeaveDto.leaveDates.map((date) =>
        new Date(date).toLocaleDateString('en-US', dateFormatOptions),
      ),
      user: { id: userId },
    });

    return this.leaveRepository.save(newLeave);
  }

  findAll(): Promise<Leave[]> {
    return this.leaveRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Leave> {
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!leave) {
      throw new NotFoundException(`Leave request with ID ${id} not found.`);
    }
    return leave;
  }

  async update(
    id: number,
    updateLeaveDto: UpdateLeaveDto,
    userId: number,
  ): Promise<Leave> {
    const leave = await this.findOne(id);

    if (leave.user.id !== userId) {
      throw new UnauthorizedException('You can only update your own requests.');
    }

    if (leave.status !== 'Pending') {
      throw new UnauthorizedException(
        'Cannot update a request that has already been processed.',
      );
    }

    const updatedLeave = this.leaveRepository.merge(leave, updateLeaveDto);
    return this.leaveRepository.save(updatedLeave);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const leave = await this.findOne(id);

    if (leave.user.id !== userId) {
      throw new UnauthorizedException('You can only delete your own requests.');
    }

    if (leave.status !== 'Pending') {
      throw new UnauthorizedException(
        'Cannot delete a request that has already been processed.',
      );
    }

    await this.leaveRepository.delete(id);
    return { message: `Request with id ${id} has been deleted.` };
  }

  findByUserId(userId: number): Promise<Leave[]> {
    return this.leaveRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateStatus(id: number, status: string): Promise<Leave> {
    const leave = await this.findOne(id);
    leave.status = status;
    return this.leaveRepository.save(leave);
  }
}
