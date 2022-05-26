import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterAuthDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    @MaxLength(18)
    password: string


}