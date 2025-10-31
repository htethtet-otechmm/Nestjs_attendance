import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './entities/leave.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async create(
    @Body() createLeaveDto: CreateLeaveDto,
    @Req() req: any,
  ): Promise<Leave> {
    const userId = req.user.id;
    return this.leaveService.create(createLeaveDto, userId);
  }

  @Get('admin')
  @Roles('admin')
  async findAllForAdmin(): Promise<Leave[]> {
    return this.leaveService.findAll();
  }

  @Get('user/:id')
  async findUserLeaveRequests(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    const loggedInUser = req.user;

    if (loggedInUser.role !== 'admin' && loggedInUser.id !== id) {
      throw new UnauthorizedException(
        'You can only view your own leave requests.',
      );
    }
    return this.leaveService.findByUserId(id);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ): Promise<Leave> {
    const loggedInUser = req.user;
    const leave = await this.leaveService.findOne(id);

    if (loggedInUser.role !== 'admin' && leave.user.id !== loggedInUser.id) {
      throw new UnauthorizedException(
        'You are not authorized to view this request.',
      );
    }
    return leave;
  }

  @Patch(':id/approve')
  @Roles('admin')
  approveLeave(@Param('id', ParseIntPipe) id: number) {
    return this.leaveService.updateStatus(id, 'Approved');
  }

  @Patch(':id/reject')
  @Roles('admin')
  rejectLeave(@Param('id', ParseIntPipe) id: number) {
    return this.leaveService.updateStatus(id, 'Rejected');
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLeaveDto: UpdateLeaveDto,
    @Req() req: any,
  ) {
    return this.leaveService.update(id, updateLeaveDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.leaveService.remove(id, req.user.id);
  }
}
