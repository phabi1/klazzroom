import { computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GetStudentsOfCourseGQL,
  Student,
} from '@klazzroom/libs-client-portal-graphql-teacher-students';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { SpacesStore } from '@klazzroom/libs-client-portal-stores-space';

export type TeacherStudentsState = {
  courseId: string | null;
  grades: any[];
  students: any[];
  loading: boolean;
  error: string | null;
  curentStudentId: string | null;
  filters: {
    search: string;
  };
};

const initialState: TeacherStudentsState = {
  courseId: null,
  grades: [],
  students: [],
  loading: false,
  error: null,
  curentStudentId: null,
  filters: {
    search: '',
  },
};

export const TeacherStudentsStore = signalStore(
  withState(initialState),
  withComputed((state) => ({
    filteredStudents: computed(() => {
      const students = state.students();
      if (!students) {
        return [];
      }
      let filteredStudents: Student[] = [];

      const search = state.filters.search().toLowerCase();
      if (search === '') {
        filteredStudents = students;
      } else {
        filteredStudents = students.filter((student) => {
          const firstname = student.firstname.toLowerCase();
          const lastname = student.lastname.toLowerCase();
          if (firstname.includes(search) || lastname.includes(search)) {
            return true;
          }
          return false;
        });
      }
      const studentsSorted = filteredStudents.sort((a, b) => {
        if (a.lastname < b.lastname) {
          return -1;
        }
        if (a.lastname > b.lastname) {
          return 1;
        } else {
          if (a.firstname < b.firstname) {
            return -1;
          }
          if (a.firstname > b.firstname) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      return studentsSorted;
    }),
    currentStudent: computed(() => {
      return (
        state
          .students()
          .find((student) => student.id === state.curentStudentId) || null
      );
    }),
  })),
  withMethods((state, getStudentsGql = inject(GetStudentsOfCourseGQL)) => ({
    loadStudents: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(state, { loading: true, error: null });
        }),

        switchMap(() => {
          return getStudentsGql
            .fetch({ courseId: state.courseId() || '' })
            .pipe(
              tapResponse(
                (response) => {
                  const grades = response.data?.course.grades || [];
                  const students =
                    response.data?.course.students.map((student) => ({
                      ...student,
                    })) || [];
                  patchState(state, {
                    loading: false,
                    error: null,
                    students,
                    grades,
                  });
                },
                (error: any) => {
                  patchState(state, { loading: false, error: error.message });
                }
              )
            );
        })
      )
    ),
    search(search: string) {
      patchState(state, {
        filters: {
          ...state.filters(),
          search,
        },
      });
    },
    addStudent: (student: Student) => {
      const students = state.students();
      patchState(state, { students: [...students, student] });
    },
    updateStudent: (studentId: string, student: Student) => {
      const students = state.students();
      const newStudents = students.map((s) => {
        if (s.id === studentId) {
          return { ...s, ...student };
        }
        return s;
      });
      patchState(state, {
        students: newStudents,
      });
    },
    removeStudent: (studentId: string) => {
      const students = state.students();
      const newStudents = students.filter(
        (student) => student.id !== studentId
      );
      patchState(state, {
        students: newStudents,
        curentStudentId:
          state.curentStudentId() === studentId
            ? null
            : state.curentStudentId(),
      });
    },
    setCurrentStudentId: (studentId: string) => {
      patchState(state, { curentStudentId: studentId });
    },
  })),
  withHooks({
    onInit: (store) => {
      const spaceStore = inject(SpacesStore);
      const route = inject(ActivatedRoute);

      const space = spaceStore.currentSpace();
      if (!space) {
        return;
      }
      patchState(store, {
        courseId: (space as any).courseId || null,
      });
      store.loadStudents();

      const routeParamsSubscription = route.params.subscribe((params) => {
        const studentId = params['studentId'];
        store.setCurrentStudentId(studentId);
      });

      return () => {
        routeParamsSubscription.unsubscribe();
      };
    },
  })
);
