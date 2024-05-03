import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceSchema } from './entities/space.entity';
import { TeacherSpaceSchema } from './entities/teacher-space.entity';
import { SpaceResolver } from './resolvers/space.resolver';
import { TeacherResolver } from './resolvers/teacher/teacher.resolver';
import { SpaceService } from './services/space.service';
import { ConfigService } from '@nestjs/config';
import {
  AdministratorSpace,
  AdministratorSpaceSchema,
} from './entities/administrator-space.entity';

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
          {
            name: 'AdminstratorSpace',
            schema: AdministratorSpaceSchema,
          },
        ],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'course',
        useFactory: (configService: ConfigService) =>
          configService.get('course.service'),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [SpaceResolver, SpaceService, TeacherResolver],
})
export class SpaceModule {}
