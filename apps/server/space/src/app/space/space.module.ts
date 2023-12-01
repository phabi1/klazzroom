import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceSchema } from './entities/space.entity';
import { TeacherSpaceSchema } from './entities/teacher-space.entity';
import { SpaceResolver } from './resolvers/space.resolver';
import { TeacherResolver } from './resolvers/teacher/teacher.resolver';
import { SpaceService } from './services/space.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Space',
        schema: SpaceSchema,
        discriminators: [
          {
            name: 'TeacherSpace',
            schema: TeacherSpaceSchema,
          },
        ],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'course',
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://rabbitmq:5672'],
              queue: 'course_queue',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  providers: [SpaceResolver, SpaceService, TeacherResolver],
})
export class SpaceModule {}
