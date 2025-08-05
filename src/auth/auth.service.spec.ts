import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

const mockAuthRepository = () => ({
  register: jest.fn(),
  validateUser: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<ReturnType<typeof mockAuthRepository>>;
  let jwtService: jest.Mocked<ReturnType<typeof mockJwtService>>;

  const mockUser = {
    _id: 'userId',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    phone: '0123456789',
  };

  const mockRegisterDto: RegisterDto = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '0123456789',
  };

  const mockLoginDto: LoginDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useFactory: mockAuthRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get(AuthRepository);
    jwtService = module.get(JwtService);
  });

  describe('register', () => {
    it('should register a user and return access_token and user info', async () => {
      authRepository.register.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('signed-jwt-token');

      const result = await service.register(mockRegisterDto);

      expect(authRepository.register).toHaveBeenCalledWith(mockRegisterDto);
      expect(authRepository.register).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser._id,
      });
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        access_token: 'signed-jwt-token',
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          phone: mockUser.phone,
        },
      });
    });

    it('should throw error when registration fails', async () => {
      authRepository.register.mockRejectedValue(new Error('Email already exists'));

      await expect(service.register(mockRegisterDto)).rejects.toThrow('Email already exists');
      expect(authRepository.register).toHaveBeenCalledWith(mockRegisterDto);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw error when JWT signing fails', async () => {
      authRepository.register.mockResolvedValue(mockUser);
      jwtService.sign.mockImplementation(() => {
        throw new Error('JWT signing failed');
      });

      await expect(service.register(mockRegisterDto)).rejects.toThrow('JWT signing failed');
      expect(authRepository.register).toHaveBeenCalledWith(mockRegisterDto);
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login a user and return access_token and user info', async () => {
      authRepository.validateUser.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('signed-jwt-token');

      const result = await service.login(mockLoginDto);

      expect(authRepository.validateUser).toHaveBeenCalledWith(mockLoginDto);
      expect(authRepository.validateUser).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser._id,
      });
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        access_token: 'signed-jwt-token',
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          phone: mockUser.phone,
        },
      });
    });

    it('should throw UnauthorizedException when user validation fails', async () => {
      authRepository.validateUser.mockResolvedValue(null);

      await expect(service.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      expect(authRepository.validateUser).toHaveBeenCalledWith(mockLoginDto);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when user is undefined', async () => {
      authRepository.validateUser.mockResolvedValue(undefined);

      await expect(service.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      expect(authRepository.validateUser).toHaveBeenCalledWith(mockLoginDto);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw error when JWT signing fails during login', async () => {
      authRepository.validateUser.mockResolvedValue(mockUser);
      jwtService.sign.mockImplementation(() => {
        throw new Error('JWT signing failed');
      });

      await expect(service.login(mockLoginDto)).rejects.toThrow('JWT signing failed');
      expect(authRepository.validateUser).toHaveBeenCalledWith(mockLoginDto);
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should handle repository errors during login', async () => {
      authRepository.validateUser.mockRejectedValue(new Error('Database connection failed'));

      await expect(service.login(mockLoginDto)).rejects.toThrow('Database connection failed');
      expect(authRepository.validateUser).toHaveBeenCalledWith(mockLoginDto);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  // Test service initialization
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
