import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/repositories/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from '../../user/schemas/user.schema';

@Injectable()
export class AuthRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const userToCreate = { ...registerDto, password: hashedPassword };
    return this.userRepository.createUser(userToCreate);
  }

  async validateUser(loginDto: LoginDto): Promise<UserDocument | null> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userRepository.findByEmail(email);
  }
}
