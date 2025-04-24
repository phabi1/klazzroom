import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.model';

@Injectable()
export class AccountService {
  findById(id: string): Promise<Account | null> {
    return Promise.resolve({
      id,
    } as Account);
  }
}
