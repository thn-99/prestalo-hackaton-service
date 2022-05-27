import { Controller, Get, Post, Body, Patch, Param, Delete,Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Response as Res } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() userRegister: RegisterAuthDto) {
    return this.authService.register(userRegister);
  }

  // Not using this one to simplify FE logic
  // @Post('login')
  // async loginUser(@Body() loginUser:LoginAuthDto,@Response() res:Res) {
  //   const {payload,token} = await this.authService.login(loginUser);
  //   res.setHeader("Authorization","Bearer "+token);
  //   res.json(payload);
  //   return res;
  // }

  @Post('login')
  async loginUser(@Body() loginUser:LoginAuthDto) {
    return this.authService.login(loginUser);
  }
}
