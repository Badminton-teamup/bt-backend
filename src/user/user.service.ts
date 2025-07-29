import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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
  private idCounter = 1;

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.idCounter++,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
