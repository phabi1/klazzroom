import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeSchema } from './entities/grade.entity';
import { GradeResolver } from './resolvers/grade.resolver';
import { GradeService } from './services/grade.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Grade', schema: GradeSchema }]),
  ],
  providers: [GradeResolver, GradeService],
  exports: [GradeService],
})
export class GradeModule {}
