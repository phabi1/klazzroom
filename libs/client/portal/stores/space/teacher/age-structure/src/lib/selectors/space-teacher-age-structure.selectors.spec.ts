import * as fromSpaceTeacherAgeStructure from '../reducers/space-teacher-age-structure.reducer';
import { selectSpaceTeacherAgeStructureState } from './space-teacher-age-structure.selectors';

describe('SpaceTeacherAgeStructure Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSpaceTeacherAgeStructureState({
      [fromSpaceTeacherAgeStructure.spaceTeacherAgeStructureFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
