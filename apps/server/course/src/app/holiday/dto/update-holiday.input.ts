import { InputType, PartialType } from '@nestjs/graphql';
import { CreateHolidayInput } from './create-holiday.input';

@InputType()
export class UpdateHolidayInput extends PartialType(CreateHolidayInput) {}
