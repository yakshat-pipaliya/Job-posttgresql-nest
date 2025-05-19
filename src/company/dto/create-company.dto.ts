import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { createCompanyDtoExamples, createCompanyDtoDescriptions } from '../../common/message';

export class CreateCompanyDto {
    @ApiProperty({ example: createCompanyDtoExamples.CompanyName, description: createCompanyDtoDescriptions.CompanyName })
    @IsNotEmpty()
    @IsString()
    CompanyName: string;

    @ApiProperty({ example: createCompanyDtoExamples.Email, description: createCompanyDtoDescriptions.Email })
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @ApiProperty({ example: createCompanyDtoExamples.ContactNo, description: createCompanyDtoDescriptions.ContactNo })
    @IsNotEmpty()
    @IsString()
    ContactNo: string;

    @ApiProperty({ example: createCompanyDtoExamples.Location, description: createCompanyDtoDescriptions.Location })
    @IsNotEmpty()
    @IsString()
    Location: string;
}
