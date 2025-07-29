import { Controller, Get, Render } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render('index')
  findAll() {
    return { users: this.userService.findAll() };
  }
}
