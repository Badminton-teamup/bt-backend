import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findById(id: string): Promise<Account | null> {
    return this.accountModel.findById(id).exec();
  }

  async update(
    id: string,
    updateData: Partial<Account>,
  ): Promise<Account | null> {
    return this.accountModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Account | null> {
    return this.accountModel.findByIdAndDelete(id).exec();
  }
}
