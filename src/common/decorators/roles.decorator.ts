import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/rule.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
