import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Domain } from '../../entities/domain.entity';
import { CreateDomainInput } from '../../inputs/create-skill-domain.input';
import { DomainService } from '../../services/domain/domain.service';
import { UpdateDomainInput } from '../../inputs/update-skill-domain.input';

@Resolver()
export class DomainResolver {
  constructor(private readonly domainService: DomainService) {}

  @Query(() => [Domain], { name: 'skillDomains' })
  items() {
    return this.domainService.findAll();
  }

  @Query(() => Domain, { name: 'skillDomain' })
  item(@Args('id', { type: () => ID }) id: string) {
    return this.domainService.findOne(id);
  }

  @Mutation(() => Domain, { name: 'createSkillDomain' })
  create(@Args('data') data: CreateDomainInput) {
    return this.domainService.create(data);
  }

  @Mutation(() => Domain, { name: 'updateSkillDomain' })
  update(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: UpdateDomainInput
  ) {
    return this.domainService.update(id, data);
  }

  @Mutation(() => Domain, { name: 'removeSkillDomain' })
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.domainService.remove(id);
  }
}
