import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  SignInDto,
  SignUpDto,
  UpdateUserDto,
} from './dto/user.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.userService.signUp(dto);
  }

  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.userService.signIn(dto);
  }

  @Get('verify')
  verifyToken(@Req() req: Request) {
    return this.userService.verifySession(req);
  }

  @Get()
  // @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserByEmail(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @Get('driver/:id')
  getDriverInfo(@Param('id') id: string) {
    return this.userService.getDriverInfo(id);
  }
}
