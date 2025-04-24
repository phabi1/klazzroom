import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class AdministratorSpace {
  @Field(() => ID)
  id!: string;
  @Field()
  title!: string;
}
