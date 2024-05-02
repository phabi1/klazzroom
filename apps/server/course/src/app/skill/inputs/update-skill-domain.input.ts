import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSkillInput } from './create-skill-domain.input';

@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
}
