import { Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeaveService {
  private readonly leaveRequests = [
    {
      id: 1,
      dates: ['Apr 25'],
      leaveType: 'Unpaid Leave',
      mode: 'Full Day',
      numberOfDays: 1,
      reason: 'Emergency',
      submittedOn: 'Apr 25',
      status: 'Pending',
    },
    {
      id: 2,
      dates: ['Mar 25'],
      leaveType: 'Paid Leave',
      mode: 'Half-day',
      numberOfDays: 0.5,
      reason: 'Family Issues',
      submittedOn: 'Apr 23',
      status: 'Approved',
    },
    {
      id: 3,
      dates: ['Feb 28, Mar 1, 2'],
      leaveType: 'Maternity',
      mode: 'Multi-days',
      numberOfDays: 3,
      reason: 'Casual',
      submittedOn: 'Apr 23',
      status: 'Rejected',
    },
  ];
  create(createLeaveDto: CreateLeaveDto) {
    const newRequest = {
      id: Date.now(),
      ...createLeaveDto,
      submittedOn: new Date().toLocaleDateString(),
      status: 'Pending',
    };
    this.leaveRequests.push(newRequest);
    return newRequest;
  }

  findAll() {
    return this.leaveRequests;
  }

  findOne(id: number) {
    return `This action returns a #${id} leave`;
  }

  update(id: number, updateLeaveDto: UpdateLeaveDto) {
    return `This action updates a #${id} leave`;
  }

  remove(id: number) {
    return { message: `Request with id ${id} deleted.` };
  }
}
