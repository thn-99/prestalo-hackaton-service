import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type TransactionDocument = Transaction & Document;

@Schema({timestamps:{createdAt:true,updatedAt:false}})
export class Transaction {
  @Prop()
  sender_wallet_id: string;

  @Prop()
  reciever_wallet_id: string;

  @Prop()
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
