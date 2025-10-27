import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createLeaveDto: CreateLeaveDto): Promise<Leave> {
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    const newLeave = this.leaveRepository.create({
      ...createLeaveDto,
      dates: createLeaveDto.leaveDates.map((date) =>
        new Date(date).toLocaleDateString('en-US', dateFormatOptions),
      ),
      submittedOn: new Date().toLocaleDateString('en-US', dateFormatOptions),
      status: 'Pending',
    });

    return this.leaveRepository.save(newLeave);
  }

  // async findAll(): Promise<Leave[]> {
  //   return this.leaveRepository.find();
  // }

  findAll(): Promise<Leave[]> {
    // MODIFIED: relations: ['user'] ကို ထည့်ပါ။
    return this.leaveRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Leave> {
    const leave = await this.leaveRepository.findOneBy({ id });
    if (!leave) {
      throw new NotFoundException(`Leave request with ID ${id} not found.`);
    }
    return leave;
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<Leave> {
    const leave = await this.leaveRepository.preload({
      id: id,
      ...updateLeaveDto,
    });
    if (!leave) {
      throw new NotFoundException(`Leave request with ID ${id} not found.`);
    }
    return this.leaveRepository.save(leave);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.leaveRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Leave request with ID ${id} not found.`);
    }
    return { message: `Request with id ${id} has been deleted.` };
  }

  findByUserId(userId: number): Promise<Leave[]> {
    return this.leaveRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
