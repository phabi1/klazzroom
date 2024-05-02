import { Query, Resolver } from '@nestjs/graphql';
import { DomainService } from '../../services/domain/domain.service';
import { Domain } from '../../entities/domain.entity';

@Resolver()
export class DomainResolver {
  constructor(private readonly domainService: DomainService) {}

  @Query(() => [Domain], { name: 'skillDomains' })
  items() {
    return this.domainService.findAll();
  }
}
