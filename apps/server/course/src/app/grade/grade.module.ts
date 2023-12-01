import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeSchema } from './entities/grade.entity';
import { GradeResolver } from './resolvers/grade.resolver';
import { GradeService } from './services/grade.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'grade', schema: GradeSchema }])],
  providers: [GradeResolver, GradeService],
})
export class GradeModule {}
