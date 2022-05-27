import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { Transaction, TransactionDocument } from './entities/transaction.schema';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectConnection() private readonly connection: Connection,
    private userService: UserService
  ) { }

  async send(senderId: number, sendTransactionDto: SendTransactionDto) {
    
    const transactionSession = await this.connection.startSession();

    transactionSession.startTransaction();

    
    const { amount: amountToSend, recieverWalletId } = sendTransactionDto;

    const senderUser = await this.userService.findOne(senderId);

    if (senderUser.wallet_amount - amountToSend < 0) return //Cannot send

    const destinationUser = await this.userService.findByWallet(recieverWalletId);

    if (!destinationUser) return //No destination user found


    let newTransaction = {
      amount: amountToSend,
      sender_wallet_id: senderUser.wallet_id,
      reciever_wallet_id: recieverWalletId
    }

    newTransaction = await this.transactionModel.create(newTransaction);
    senderUser.wallet_amount-=amountToSend;
    await senderUser.save();

    destinationUser.wallet_amount+=amountToSend;
    await destinationUser.save();

    transactionSession.endSession();

  }

  findAllSentAndRecievedTransactionsByWalletId(wallet_id:string){
    return this.transactionModel.find({$or:[{sender_wallet_id:wallet_id},{reciever_wallet_id:wallet_id}]});
  }
}
