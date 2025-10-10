// export class CreateLeaveDto {
//   leaveType: 'Paid' | 'Unpaid' | 'Maternity';
//   mode: 'Half-day' | 'Full Day' | 'Multi-days';
//   dates: string[];
//   numberOfDays: number;
//   reason: string;
// }

// src/leave/dto/create-leave.dto.ts

import { IsString, IsArray, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  leaveType: string;

  @IsString()
  @IsNotEmpty()
  mode: string;

  @IsArray()
  @IsNotEmpty()
  leaveDates: Date[];

  @IsString()
  reason: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfDays: number;
}
