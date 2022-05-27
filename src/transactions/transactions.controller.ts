import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {  SendTransactionDto } from './dto/send-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  send(@Request() req, @Body() createTransactionDto: SendTransactionDto) {
    const sender = req.user;    
    return this.transactionsService.send(sender.id,createTransactionDto);
  }

  @Get()
  findAllSentAndRecievedTransactionsByWalletId(@Request() req) {
    const sender = req.user;
    return this.transactionsService.findAllSentAndRecievedTransactionsByWalletId(sender.wallet_id);
  }


}
