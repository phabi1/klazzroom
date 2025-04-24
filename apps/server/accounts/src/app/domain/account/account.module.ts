import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';

@Module({
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
