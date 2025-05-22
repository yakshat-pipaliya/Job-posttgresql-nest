import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages, loginDtoExamples, loginDtoDescriptions } from '../../common/message';

export class LoginUserDto {
    @ApiProperty({ example: loginDtoExamples.email, description: loginDtoDescriptions.email })
    @IsNotEmpty({ message: messages.emailRequired })
    @IsEmail({}, { message: messages.invalidEmail })
    Email: string;

    @ApiProperty({ example: loginDtoExamples.password, description: loginDtoDescriptions.password })
    @IsNotEmpty({ message: messages.passwordRequired })
    @IsString({ message: messages.passwordTooWeak })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    Password: string;
}
