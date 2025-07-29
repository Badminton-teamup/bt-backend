import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'alice',
      email: 'alice@example.com',
      password: 'secret',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      username: 'bob',
      email: 'bob@example.com',
      password: 'secret',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
  ];

  findAll(): User[] {
    return this.users;
  }
}
