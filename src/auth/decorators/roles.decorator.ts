import { SetMetadata } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: User[]) => SetMetadata(ROLES_KEY, roles);
