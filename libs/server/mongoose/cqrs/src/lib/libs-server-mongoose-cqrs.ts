import { IEvent, IEventBus } from '@nestjs/cqrs';
import { Schema } from 'mongoose';

export interface PluginOptions {
  eventBus: IEventBus;
}

export function Plugin<T>(schema: Schema<T>, options: PluginOptions) {
  schema.post('init', function (doc: any) {
    console.log('schema init');
    doc._events = [];
    doc._eventBus = options.eventBus;
  });

  schema
    .virtual('autoCommit')
    .get(function (this: any) {
      return this._autoCommit;
    })
    .set(function (this: any, value: boolean) {
      return (this._autoCommit = !!value);
    });

  schema.method('apply', function (this: any, event: IEvent) {
    this._events = this._events || [];
    this._events.push(event);
  });

  schema.method('commit', function (this: any) {
    this._eventBus = this._eventBus || options.eventBus;
    this._eventBus.publishAll(this._events);
    this._events = [];
  });
}
