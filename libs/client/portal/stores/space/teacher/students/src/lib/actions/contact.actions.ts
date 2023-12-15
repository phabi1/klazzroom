import { Update } from '@ngrx/entity';
import { createActionGroup, props } from '@ngrx/store';
import {
  ContactInfo,
  CreateContactInfoInput,
  UpdateContactInfoInput,
} from '../../graphql/generated';

export const SpaceTeacherStudentsContactActions = createActionGroup({
  source: 'Student/Contact/API',
  events: {
    'Add Contact': props<{
      contact: CreateContactInfoInput;
      student: string;
    }>(),
    'Add Contact Success': props<{ contact: ContactInfo }>(),
    'Add Contact Failure': props<{ error: string }>(),
    'Update Contact': props<{
      id: string;
      contact: UpdateContactInfoInput;
    }>(),
    'Update Contact Success': props<{ contact: ContactInfo }>(),
    'Update Contact Failure': props<{ error: string }>(),
    'Delete Contact': props<{ id: string }>(),
    'Delete Contact Success': props<{ id: string }>(),
    'Delete Contact Failure': props<{ error: string }>(),
  },
});
