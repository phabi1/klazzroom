import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Identity } from '../models/identity.model';

export const CurrentUser = createParamDecorator((data, ctx): Identity => {
  const gqlCtx = GqlExecutionContext.create(ctx);
  const request = gqlCtx.getContext().req;
  if (request.headers['x-user-id']) {
    return {
      id: request.headers['x-user-id'] as string,
    };
  }
  return {
    id: '',
  };
});
