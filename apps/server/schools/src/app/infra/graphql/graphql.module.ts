import {
  DataloaderRegistryService,
  LibsServerGraphqlSubgraphDataloadersModule,
} from '@klazzroom/libs-server-graphql-subgraph-dataloaders';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CourseModule } from '../../domain/course/course.module';
import { GradeModule } from '../../domain/grade/grade.module';
import { GradeService } from '../../domain/grade/services/grade.service';
import { SkillModule } from '../../domain/skill/skill.module';
import { CourseResolver } from './resolvers/course/course.resolver';
import { GradeResolver } from './resolvers/grade/grade.resolver';
import { SkillResolver } from './resolvers/skill/skill.resolver';
import { StudentResolver } from './resolvers/student/student.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [
        LibsServerGraphqlSubgraphDataloadersModule.registerAsync({
          imports: [forwardRef(() => GradeModule)],
          useFactory: (gradeService: GradeService) => {
            return {
              loaders: [
                {
                  name: 'grade',
                  loader: gradeService,
                },
              ],
            };
          },
          inject: [GradeService],
        }),
      ],
      useFactory: (dataloaderRegistryService) => ({
        context: ({ req }) => ({ req, loaders: dataloaderRegistryService }),
        autoSchemaFile: {
          federation: 2,
        },
      }),
      inject: [DataloaderRegistryService],
    }),
    forwardRef(() => GradeModule),
    forwardRef(() => CourseModule),
    forwardRef(() => SkillModule),
  ],
  providers: [GradeResolver, SkillResolver, CourseResolver, StudentResolver],
})
export class GraphqlModule {}
