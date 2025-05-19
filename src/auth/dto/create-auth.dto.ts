import { IsEmail, IsString } from 'class-validator';
export class CreateAuthDto {
    @IsEmail()
    Email: string;
    
    @IsString()
    Password: string;
}
