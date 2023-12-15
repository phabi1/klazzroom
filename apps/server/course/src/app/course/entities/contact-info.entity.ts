import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './contact.entity';

@ObjectType()
@Schema()
export class ContactInfo {
  @Field(() => ID, { description: 'Contact ID' })
  id?: string;

  @Field()
  @Prop()
  firstname: string;

  @Field()
  @Prop()
  lastname: string;

  @Field(() => [Contact])
  @Prop({ type: [ContactSchema], default: [] })
  emails: Contact[];

  @Field(() => [Contact])
  @Prop({ type: [ContactSchema], default: [] })
  phones: Contact[];
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
