import { registerEnumType } from '@nestjs/graphql';

export enum Sex {
  Boy,
  Girl,
  Unknown,
}

registerEnumType(Sex, {
  name: 'Sex',
});
