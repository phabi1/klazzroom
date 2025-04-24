import {
  ContextType,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { DataloaderRegistryService } from '../services/dataloader-registry.service';

export const Dataloader = createParamDecorator(
  (data: string, ctx: ExecutionContext): DataloaderRegistryService => {
    if (ctx.getType<ContextType | GqlContextType>() !== 'graphql') {
      throw Error(
        `Context with a type ${ctx.getType()} is not supported for GraphQL data loaders.`
      );
    }
    const gqlCtx = GqlExecutionContext.create(ctx);
    const loaders = gqlCtx.getContext().loaders;
    if (!loaders) {
      throw new Error('Dataloader registry not found in request');
    }
    return loaders.get(data);
  }
);
