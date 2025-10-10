import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

export interface LeaveRequest {
  id: number;
  dates: Date[] | string[]; // Allow both for consistency
  leaveType: string;
  mode: string;
  numberOfDays: number;
  reason: string;
  submittedOn: string;
  status: string;
}

@Injectable()
export class LeaveService {
  private readonly leaveRequests: LeaveRequest[] = [
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

  create(createLeaveDto: CreateLeaveDto): LeaveRequest {
    const { leaveDates, ...restOfDto } = createLeaveDto;
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    const newRequest: LeaveRequest = {
      id: Date.now(),
      ...restOfDto,
      dates: leaveDates.map((date) =>
        new Date(date).toLocaleDateString('en-US', dateFormatOptions),
      ),
      // dates: leaveDates,
      submittedOn: new Date().toLocaleDateString('en-US', dateFormatOptions),
      status: 'Pending',
    };

    this.leaveRequests.push(newRequest);
    return newRequest;
  }

  findAll(): LeaveRequest[] {
    return this.leaveRequests;
  }

  findOne(id: number): LeaveRequest {
    const leave = this.leaveRequests.find((req) => req.id === id);
    if (!leave) {
      throw new NotFoundException(`Leave request with ID ${id} not found.`);
    }
    return leave;
  }

  // Update and Remove methods (placeholder)
  update(id: number, updateLeaveDto: UpdateLeaveDto) {
    return `This action updates a #${id} leave`;
  }

  remove(id: number) {
    const index = this.leaveRequests.findIndex((req) => req.id === id);
    if (index === -1) {
      throw new NotFoundException(`Leave request with ID ${id} not found.`);
    }
    this.leaveRequests.splice(index, 1);
    return { message: `Request with id ${id} has been deleted.` };
  }
}
