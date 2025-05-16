import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'Full name of the user', nullable: true })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    Name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address of the user', nullable: true })
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    Email: string;

    @ApiProperty({ example: 'strongPassword123', description: 'User password', nullable: true })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    Password: string;

    @ApiProperty({ example: '+9876543210', description: 'User phone number', nullable: true })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    PhoneNo: string;

    @ApiProperty({ example: 'user', description: 'Role of the user', enum: ['user', 'admin'], default: 'user', nullable: true })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    Role: 'user' | 'admin';
}
