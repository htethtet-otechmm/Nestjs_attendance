export class CreateLeaveDto {
  leaveType: 'Paid' | 'Unpaid' | 'Maternity';
  mode: 'Half-day' | 'Full Day' | 'Multi-days';
  dates: string[];
  numberOfDays: number;
  reason: string;
}
