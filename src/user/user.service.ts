import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ){}

  update(id:number,user:any) {
    return this.userModel.findByIdAndUpdate(id,user);
  }


  findOne(id: number) {
    return this.userModel.findById(id);
  }

  findOneByEmail(email:string){
    return this.userModel.find({email:email});
  }

  findByWallet(walletId:string){
    return this.userModel.findOne({wallet_id:walletId});
  }
}
