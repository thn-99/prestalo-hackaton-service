import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  wallet_id: string;

  @Prop()
  wallet_amount:number;
}

export const UserSchema = SchemaFactory.createForClass(User);
