
import { IsNumber, IsPositive, IsUUID, MaxLength, MinLength } from 'class-validator';
export class SendTransactionDto {

    @IsUUID("4")
    recieverWalletId: string;

    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    amount: number
}
