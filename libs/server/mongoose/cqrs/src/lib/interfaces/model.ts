import { IEvent } from '@nestjs/cqrs';

export type AggregatorModelProps = {
    autoCommit?: boolean;
}

export type AggregatorModelMethods = {
    apply(event: IEvent, position?: 'append' | 'prepend'): void;
    commit(): void;
}