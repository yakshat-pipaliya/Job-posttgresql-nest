import { IsNotEmpty, IsString, IsEmail, MinLength, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages, userDtoExamples, userDtoDescriptions, UserRole } from '../../common/message';

export class CreateUserDto {
    @ApiProperty({ example: userDtoExamples.name, description: userDtoDescriptions.name })
    @IsNotEmpty({ message: messages.nameRequired })
    @IsString({ message: messages.nameRequired })
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    Name: string;

    @ApiProperty({ example: userDtoExamples.email, description: userDtoDescriptions.email })
    @IsNotEmpty({ message: messages.emailRequired })
    @IsEmail({}, { message: messages.invalidEmail })
    @Matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        { message: 'Email must be a valid Gmail address ending with @gmail.com' }
    )
    Email: string;

    @ApiProperty({ example: userDtoExamples.password, description: userDtoDescriptions.password })
    @IsNotEmpty({ message: messages.passwordRequired })
    @IsString({ message: messages.passwordTooWeak })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' }
    )
    Password: string;

    @ApiProperty({ example: userDtoExamples.phoneNo, description: userDtoDescriptions.phoneNo })
    @IsNotEmpty({ message: messages.phoneRequired })
    @IsString({ message: messages.invalidPhone })
    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid phone number' })
    PhoneNo: string;

    @ApiProperty({ example: userDtoExamples.role, description: userDtoDescriptions.role, enum: UserRole, default: UserRole.User })
    @IsNotEmpty({ message: messages.roleRequired })
    @IsEnum(UserRole, { message: 'Invalid role selected' })
    Role: UserRole;
}
