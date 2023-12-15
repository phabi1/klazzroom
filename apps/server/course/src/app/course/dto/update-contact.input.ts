import { InputType, PartialType } from '@nestjs/graphql';
import { CreateContactInfoInput } from './create-contact.input';

@InputType()
export class UpdateContactInfoInput extends PartialType(CreateContactInfoInput) {}
