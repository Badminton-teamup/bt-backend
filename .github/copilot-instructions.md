# Badminton Teamup Backend - AI Coding Instructions

## General Rule
- **Best Practices**: Mọi code, cấu trúc thư mục, tài liệu, quy trình phát triển, và giao tiếp đều phải tuân thủ best practice (chuẩn mực tốt nhất) của cộng đồng lập trình, đặc biệt là cho NestJS, TypeScript, MongoDB, RESTful API, bảo mật, kiểm thử, CI/CD, và quản lý mã nguồn.
- **Code Readability & Clean Code**: Nếu code, class, file, hoặc folder quá dài hoặc phức tạp, phải chủ động chia nhỏ thành các class, file, folder hợp lý để tăng khả năng đọc hiểu, bảo trì và mở rộng. Luôn đảm bảo code clean, tuân thủ nguyên tắc SOLID, DRY, KISS, và các chuẩn clean code.

## Project Overview
This is a **NestJS-based backend** for a badminton teamup application using **MongoDB** with **Mongoose**, **JWT authentication**, and **Swagger API documentation**. The architecture follows NestJS conventions with a modular design pattern.

## Key Architecture Patterns

### Module Structure
- **Feature-based modules**: Each domain (auth, user) has its own module with controller, service, repository
- **Repository pattern**: Database operations are abstracted into repository classes (`UserRepository`, `AuthRepository`)
- **Guard-based authorization**: JWT guards (`JwtAuthGuard`) and role-based guards (`RolesGuard`)
- **Custom decorators**: `@GetUser()` for extracting user from JWT, `@Roles()` for role-based access

### Database & Schemas
- **MongoDB with Mongoose**: Using `@Schema()` decorators and `SchemaFactory.createForClass()`
- **Auto-timestamps**: All schemas use `{ timestamps: true }` for automatic `createdAt`/`updatedAt`
- **Type safety**: TypeScript types like `UserDocument = User & Document`

### Authentication Flow
- **JWT-based auth** with Passport integration
- **Password hashing** using bcryptjs
- **Environment config**: JWT secrets via `ConfigService` with fallback defaults
- **24-hour token expiry** configured in `AuthModule`

## Development Workflow

### Essential Commands
```bash
# Development with SWC and hot reload
npm run start

# Testing
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage reports

# Code quality
npm run lint          # ESLint with auto-fix
npm run format        # Prettier formatting
```

### Configuration Files
- **ESLint**: Modern flat config in `eslint.config.mjs` with TypeScript, Prettier integration
- **Commitlint**: Conventional commits enforced via `commitlint.config.js` with Husky hooks
- **SWC**: Fast TypeScript compilation for development builds

## API Documentation
- **Swagger UI**: Available at `/api` endpoint when running
- **Vietnamese to English**: Convert all API descriptions from Vietnamese to English (ongoing effort)
- **Validation**: Using `class-validator` decorators on DTOs with `ValidationPipe`

## Communication & Language Rules

### Language Guidelines
- **Communication**: Always respond and communicate in Vietnamese (Tiếng Việt)
- **Code**: All code, comments, variable names, function names, class names, and documentation must be in English
- **API Documentation**: All Swagger descriptions, error messages, and API responses should be in English
- **Database**: All collection names, field names, and schema definitions must be in English

## Code Conventions

### File Organization
```
src/
├── auth/                    # Authentication module
│   ├── decorators/         # Custom decorators (@GetUser, @Roles)
│   ├── dto/               # Data transfer objects
│   ├── guards/            # Auth guards (JWT, Roles)
│   ├── repositories/      # Data access layer
│   └── strategies/        # Passport strategies
├── user/                   # User management module
│   ├── repositories/      # User data operations
│   └── schemas/           # Mongoose schemas
└── common/                 # Shared utilities and constants
```

### Repository Pattern Example
```typescript
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
```

### Controller Patterns
- **Validation**: Always use `@Body(ValidationPipe)` for request validation
- **Swagger**: Include `@ApiOperation`, `@ApiResponse` for all endpoints
- **Guards**: Apply `@UseGuards(JwtAuthGuard)` for protected routes

## Environment Setup
- **MongoDB**: Configure `MONGO_DB_URI` in `.env`
- **JWT**: Set `JWT_SECRET` or fallback to default
- **Port**: Defaults to 3000 via `process.env.PORT ?? 3000`

## Testing Strategy
- **Unit tests**: `*.spec.ts` files alongside source code
- **E2E tests**: Located in `/test` directory with separate Jest config
- **Coverage**: Configured to collect from all TypeScript files

## Integration Points
- **MongoDB**: Async connection via `MongooseModule.forRootAsync()`
- **Config management**: Global `ConfigModule` with environment variable injection
- **Validation**: Global `ValidationPipe` in `main.ts`
- **Swagger**: Auto-generated documentation with DTOs and decorators
