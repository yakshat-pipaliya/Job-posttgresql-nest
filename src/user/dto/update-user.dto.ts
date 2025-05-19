import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages, updateUserDtoExamples, updateUserDtoDescriptions, UserRole } from '../../common/message';

export class UpdateUserDto {
    @ApiProperty({ example: updateUserDtoExamples.name, description: updateUserDtoDescriptions.name, nullable: true })
    @IsNotEmpty({ message: messages.nameRequired })
    @IsString({ message: messages.nameRequired })
    @IsOptional()
    Name: string;

    @ApiProperty({ example: updateUserDtoExamples.email, description: updateUserDtoDescriptions.email, nullable: true })
    @IsNotEmpty({ message: messages.emailRequired })
    @IsEmail({}, { message: messages.invalidEmail })
    @IsOptional()
    Email: string;

    @ApiProperty({ example: updateUserDtoExamples.password, description: updateUserDtoDescriptions.password, nullable: true })
    @IsNotEmpty({ message: messages.passwordRequired })
    @IsString({ message: messages.passwordTooWeak })
    @IsOptional()
    Password: string;

    @ApiProperty({ example: updateUserDtoExamples.phoneNo, description: updateUserDtoDescriptions.phoneNo, nullable: true })
    @IsNotEmpty({ message: messages.phoneRequired })
    @IsString({ message: messages.invalidPhone })
    @IsOptional()
    PhoneNo: string;

    @ApiProperty({ example: updateUserDtoExamples.role, description: updateUserDtoExamples.role, enum: UserRole, default: UserRole.User })
    @IsNotEmpty({ message: messages.roleRequired })
    @IsString({ message: messages.roleRequired })
    @IsOptional()
    Role: UserRole;
}
