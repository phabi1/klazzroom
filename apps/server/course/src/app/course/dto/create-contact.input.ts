import { Field, InputType } from '@nestjs/graphql';
import { ContactInput } from './contact.input';

@InputType()
export class CreateContactInfoInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => [ContactInput])
  emails: ContactInput[];

  @Field(() => [ContactInput])
  phones: ContactInput[];
}
