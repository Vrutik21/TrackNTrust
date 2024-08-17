import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ):
    | boolean
    | Promise<boolean>
    | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request>();

    return this.verifySession(request);
  }

  async verifySession(
    req: Request,
  ): Promise<boolean> {
    try {
      const token = req.headers.token;

      if (!token) {
        throw new UnauthorizedException(
          'Token not provided',
        );
      }

      const isValid =
        await this.userService.verifyJwt(
          token.toString(),
        );

      if (!isValid) {
        throw new UnauthorizedException(
          'Invalid token',
        );
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException(
        err.response,
      );
    }
  }
}
