import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { Param, Put, Delete } from '@nestjs/common';
import { UpdateAccountDto } from './dtos/update-account.dto';

@Controller('account')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    const account = this.accountService.create(createAccountDto);
    return account;
  }

  @Get()
  async findAll() {
    const accounts = await this.accountService.findAll();
    return { accounts };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const account = await this.accountService.findOne(id);
    return account;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const updatedAccount = await this.accountService.update(
      id,
      updateAccountDto,
    );
    return updatedAccount;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedAccount = await this.accountService.remove(id);
    return removedAccount;
  }
}
