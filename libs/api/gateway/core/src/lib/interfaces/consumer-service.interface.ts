import { IConsumer } from '../models/consumer.model';

export interface IConsumerService {
  find(): Promise<IConsumer[]>;
  findById(id: string): Promise<IConsumer>;
  create(data: any): Promise<IConsumer>;
  update(id: string, data: any): Promise<IConsumer>;
  remove(id: string): Promise<void>;
}
