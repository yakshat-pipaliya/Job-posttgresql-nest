import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
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
    Password: string;
}
