import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages, userDtoExamples, userDtoDescriptions, UserRole } from '../../common/message';

export class CreateUserDto {
    @ApiProperty({ example: userDtoExamples.name, description: userDtoDescriptions.name })
    @IsNotEmpty({ message: messages.nameRequired })
    @IsString({ message: messages.nameRequired })
    Name: string;

    @ApiProperty({ example: userDtoExamples.email, description: userDtoDescriptions.email })
    @IsNotEmpty({ message: messages.emailRequired })
    @IsEmail({}, { message: messages.invalidEmail })
    Email: string;

    @ApiProperty({ example: userDtoExamples.password, description: userDtoDescriptions.password })
    @IsNotEmpty({ message: messages.passwordRequired })
    @IsString({ message: messages.passwordTooWeak })
    Password: string;

    @ApiProperty({ example: userDtoExamples.phoneNo, description: userDtoDescriptions.phoneNo })
    @IsNotEmpty({ message: messages.phoneRequired })
    @IsString({ message: messages.invalidPhone })
    PhoneNo: string;

    @ApiProperty({ example: userDtoExamples.role, description: userDtoDescriptions.role, enum: UserRole, default: UserRole.User })
    @IsNotEmpty({ message: messages.roleRequired })
    Role: UserRole;
}
