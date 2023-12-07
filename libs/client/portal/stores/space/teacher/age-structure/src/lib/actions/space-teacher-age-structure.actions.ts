import { createActionGroup, props } from '@ngrx/store';

export const SpaceTeacherAgeStructureActions = createActionGroup({
  source: 'SpaceTeacherAgeStructure',
  events: {
    Load: props<{course: string}>(),
    'Load Success': props<{ students: any[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
