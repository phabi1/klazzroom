import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Space, Spaces } from './space.type';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@extends')
export class Me {
  @Field(() => ID)
  id!: string;

  @Field(() => [Space], { nullable: 'items' })
  spaces!: Spaces[];
}
