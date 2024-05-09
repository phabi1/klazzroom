import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStickyInput } from './create-sticky.input';

@InputType()
export class UpdateStickyInput extends PartialType(CreateStickyInput) {
}
