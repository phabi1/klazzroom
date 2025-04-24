import { DataloaderService } from '@klazzroom/libs-server-graphql-subgraph-dataloaders';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateGradeCommand } from '../commands/create-grade/create-grade.command';
import { DeleteGradeCommand } from '../commands/delete-grade/delete-grade.command';
import { UpdateGradeCommand } from '../commands/update-grade/update-grade.command';
import { Grade } from '../models/grade.model';
import { GetGradesByIdsQuery } from '../queries/get-grades-by-ids/get-grades-by-ids.query';
import { GetGradesQuery } from '../queries/get-grades/get-grades.query';

@Injectable()
export class GradeService implements DataloaderService<Grade> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async items(): Promise<Grade[]> {
    return this.queryBus.execute(new GetGradesQuery());
  }

  async itemsByIds(ids: string[]): Promise<Grade[]> {
    return this.queryBus.execute(new GetGradesByIdsQuery(ids));
  }

  create(data: {
    name: string;
    title: string;
    weight?: number;
  }): Promise<Grade> {
    return this.commandBus.execute(new CreateGradeCommand(data));
  }

  update(id: string, data: { name?: string; title?: string; weight?: number }) {
    return this.commandBus.execute(new UpdateGradeCommand(id, data));
  }

  delete(id: string) {
    return this.commandBus.execute(new DeleteGradeCommand(id));
  }
}
