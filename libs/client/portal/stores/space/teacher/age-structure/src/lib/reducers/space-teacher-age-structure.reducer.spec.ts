import { reducer, initialState } from './space-teacher-age-structure.reducer';

describe('SpaceTeacherAgeStructure Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
