import { IEventBus } from '@nestjs/cqrs';

export interface PluginOptions {
  autoCommit?: boolean;
  eventBus: IEventBus;
}

export function Plugin(schema: any, options: PluginOptions) {
  const { autoCommit = true, eventBus } = options;

  if (!eventBus) {
    throw new Error('Event bus is required');
  }

  schema.method(
    'apply',
    function (this: any, event: any, position: 'append' | 'prepend') {
      if (!Array.isArray(this.events)) {
        this.events = [];
      }
      if (position === 'append') {
        this.events.push(event);
      } else if (position === 'prepend') {
        this.events.unshift(event);
      }
    }
  );

  schema.method('commit', function (this: any) {
    if (!Array.isArray(this.events)) {
      return;
    }
    if (this.events.length === 0) {
      return;
    }
    const events = this.events;
    this.events = [];
    eventBus.publishAll(events);
  });

  schema.post('save', function (doc: any) {
    if (autoCommit) {
      doc.commit();
    }
  });

  schema.post('deleteOne', function (doc: any) {
    if (autoCommit) {
      doc.commit();
    }
  });
}
