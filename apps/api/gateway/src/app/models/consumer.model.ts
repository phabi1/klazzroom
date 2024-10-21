import { Schema } from "mongoose";

export interface IConsumer {
  id: string;
}

export const ConsumerSchema = new Schema<IConsumer>({
    
})