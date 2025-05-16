import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
    @ApiProperty({ example: 'Acme Corp', description: 'Name of the company' })
    @IsNotEmpty()
    @IsString()
    CompanyName: string;

    @ApiProperty({ example: 'contact@acme.com', description: 'Contact email of the company' })
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @ApiProperty({ example: '+1234567890', description: 'Contact phone number' })
    @IsNotEmpty()
    @IsString()
    ContactNo: string;

    @ApiProperty({ example: 'New York', description: 'Location of the company' })
    @IsNotEmpty()
    @IsString()
    Location: string;
}
