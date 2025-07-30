import { Injectable, Logger } from '@nestjs/common';
import { Account } from './schemas/account.schema';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AccountRepository } from './account.repository';
import { UpdateAccountDto } from './dtos/update-account.dto';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(private readonly accountRepository: AccountRepository) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountRepository.create(createAccountDto);
  }

  findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  findOne(id: string): Promise<Account | null> {
    return this.accountRepository.findById(id);
  }

  update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account | null> {
    return this.accountRepository.update(id, updateAccountDto);
  }

  remove(id: string): Promise<Account | null> {
    return this.accountRepository.delete(id);
  }

  // async sampleTransaction() {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();

  //   try {
  //     // ✅ Thực hiện các thao tác DB trong transaction
  //     // await this.catModel.create([{ name: 'Meo' }], { session });

  //     await session.commitTransaction(); // ✅ commit nếu không lỗi
  //   } catch (error) {
  //     await session.abortTransaction(); // ❌ rollback nếu có lỗi
  //     throw error;
  //   } finally {
  //     session.endSession(); // ✅ Luôn luôn đóng session
  //   }
  // }
}
