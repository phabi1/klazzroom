import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContactInput {
  @Field()
  type: string;
  
  @Field()
  value: string;
}
