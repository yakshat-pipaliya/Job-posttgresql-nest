import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages, updateUserDtoExamples, updateUserDtoDescriptions, UserRole } from '../../common/message';

export class UpdateUserDto {
    @ApiProperty({ example: updateUserDtoExamples.name, description: updateUserDtoDescriptions.name, nullable: true })
    @IsOptional()
    @IsNotEmpty({ message: messages.nameRequired })
    @IsString({ message: messages.nameRequired })
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    Name: string;

    @ApiProperty({ example: updateUserDtoExamples.email, description: updateUserDtoDescriptions.email, nullable: true })
    @IsOptional()
    @IsNotEmpty({ message: messages.emailRequired })
    @IsEmail({}, { message: messages.invalidEmail })
    Email: string;

    @ApiProperty({ example: updateUserDtoExamples.password, description: updateUserDtoDescriptions.password, nullable: true })
    @IsOptional()
    @IsNotEmpty({ message: messages.passwordRequired })
    @IsString({ message: messages.passwordTooWeak })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' }
    )
    Password: string;

    @ApiProperty({ example: updateUserDtoExamples.phoneNo, description: updateUserDtoDescriptions.phoneNo, nullable: true })
    @IsOptional()
    @IsNotEmpty({ message: messages.phoneRequired })
    @IsString({ message: messages.invalidPhone })
    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid phone number' })
    PhoneNo: string;

    @ApiProperty({ example: updateUserDtoExamples.role, description: updateUserDtoExamples.role, enum: UserRole, default: UserRole.User })
    @IsOptional()
    @IsNotEmpty({ message: messages.roleRequired })
    @IsEnum(UserRole, { message: 'Invalid role selected' })
    Role: UserRole;
}
