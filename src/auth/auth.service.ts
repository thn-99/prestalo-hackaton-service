import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/entities/user.schema';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    ) { }

  async register(registerUser: RegisterAuthDto) {
    const { email,password } = registerUser;

    const findUser = await this.userModel.findOne({ email });
    if (findUser) throw new HttpException('EMAIL_EXISTS', 403);

    let walletId = uuid();
    let userWithWalletId = await this.userModel.findOne({wallet_id:walletId})
    while (userWithWalletId){
      walletId = uuid();
      userWithWalletId = await this.userModel.findOne({walletId})
    }



    const hashedPassword = await hash(password, 12);
    const registerUserWithHashedPassword = { ...registerUser,wallet_id:walletId, password: hashedPassword,wallet_amount:10 };

    return this.userModel.create(registerUserWithHashedPassword);
  }

  async login(loginUser: LoginAuthDto) {
    const { email, password } = loginUser;

    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('EMAIL_PASSWORD_INVALID', 403);

    const passwordCheck = await compare(password, findUser.password);
    if (!passwordCheck) throw new HttpException('EMAIL_PASSWORD_INVALID', 404);

    const payload = {id:findUser._id,email:findUser.email,wallet_amount:findUser.wallet_amount,wallet_id:findUser.wallet_id};
    const token = this.jwtService.sign(payload);

    const data = {payload,token};

    return data;

  }

}
