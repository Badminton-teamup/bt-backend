import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { role?: string | string[] };
    if (!user || !user.role) {
      throw new ForbiddenException('You do not have permission (Roles)');
    }
    // Support both single role (string) and multiple roles (string[])
    const userRoles = Array.isArray(user.role) ? user.role : [user.role];
    const hasRole = userRoles.some((role) => requiredRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission (Roles)');
    }
    return true;
  }
}
