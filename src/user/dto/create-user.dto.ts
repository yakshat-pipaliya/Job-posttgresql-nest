import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    @IsNotEmpty()
    @IsString()
    Name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address of the user' })
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @ApiProperty({ example: 'strongPassword123', description: 'User password' })
    @IsNotEmpty()
    @IsString()
    Password: string;

    @ApiProperty({ example: '+9876543210', description: 'User phone number' })
    @IsNotEmpty()
    @IsString()
    PhoneNo: string;

    @ApiProperty({ example: 'user', description: 'Role of the user', enum: ['user', 'admin'], default: 'user' })
    Role: 'user' | 'admin';
}
