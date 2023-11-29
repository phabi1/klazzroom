import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Space {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
