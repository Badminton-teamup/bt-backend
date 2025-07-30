import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @Render('index')
  findAll() {
    return { accounts: this.accountService.findAll() };
  }
}
