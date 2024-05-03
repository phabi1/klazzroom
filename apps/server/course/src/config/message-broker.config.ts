import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('messageBroker', () => ({
  transport: process.env.MESSAGE_BROKER_TRANSPORT || Transport.RMQ,
  options: {
    urls: (process.env.MESSAGE_BROKER_URLS || 'amqp://localhost:5672').split(
      ','
    ),
    queue: process.env.MESSAGE_BROKER_QUEUE || 'course_queue',
    queueOptions: {
      durable: false,
    },
  },
}));
