import { Query, Resolver } from '@nestjs/graphql';
import { Grade } from '../../types/grade.type';
import { GradeService } from '../../../../domain/grade/services/grade.service';

@Resolver(() => Grade)
export class GradeResolver {
  constructor(private readonly gradeService: GradeService) {}

  @Query(() => [Grade])
  grades() {
    return this.gradeService.items();
  }
}
