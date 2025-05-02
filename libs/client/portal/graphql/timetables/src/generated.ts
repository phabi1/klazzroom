import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AdministratorSpace = {
  __typename?: 'AdministratorSpace';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Course = {
  __typename?: 'Course';
  grades: Array<Grade>;
  holidayZone: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  student?: Maybe<Student>;
  students: Array<Maybe<Student>>;
};


export type CourseStudentArgs = {
  id: Scalars['ID']['input'];
};

export type CreateStudentInput = {
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  firstname: Scalars['String']['input'];
  gradeId: Scalars['ID']['input'];
  lastname: Scalars['String']['input'];
  sex?: InputMaybe<StudentSex>;
};

export type CreateTimetableInput = {
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type Grade = {
  __typename?: 'Grade';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
};

export type Me = {
  __typename?: 'Me';
  id: Scalars['ID']['output'];
  spaces: Array<Maybe<Space>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdministratorSpace: AdministratorSpace;
  createSkill: Skill;
  createStudent: Student;
  createTeacherSpace: TeacherSpace;
  createTimetable: Timetable;
  deleteSkill: Skill;
  deleteStudent: Student;
  deleteTimetable: Timetable;
  updateCourse: Course;
  updateSkill: Skill;
  updateStudent: Student;
  updateTimetable: Timetable;
};


export type MutationCreateSkillArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationCreateStudentArgs = {
  courseId: Scalars['ID']['input'];
  input: CreateStudentInput;
};


export type MutationCreateTeacherSpaceArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateTimetableArgs = {
  input: CreateTimetableInput;
};


export type MutationDeleteSkillArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStudentArgs = {
  courseId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationDeleteTimetableArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCourseInput;
};


export type MutationUpdateSkillArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  parent?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUpdateStudentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateStudentInput;
};


export type MutationUpdateTimetableArgs = {
  input: UpdateTimetableInput;
};

export type Query = {
  __typename?: 'Query';
  course: Course;
  grades: Array<Grade>;
  me: Me;
  skills: Array<Skill>;
  space: Space;
  timetable: Timetable;
  timetablesByTags: Array<Timetable>;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySpaceArgs = {
  id: Scalars['String']['input'];
};


export type QueryTimetableArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTimetablesByTagsArgs = {
  tags: Array<Scalars['String']['input']>;
};

export type Skill = {
  __typename?: 'Skill';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  parent?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type Space = AdministratorSpace | TeacherSpace;

export type Student = {
  __typename?: 'Student';
  avatarUrl: Scalars['String']['output'];
  birthday?: Maybe<Scalars['DateTime']['output']>;
  firstname: Scalars['String']['output'];
  grade: Grade;
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  sex?: Maybe<StudentSex>;
};

export enum StudentSex {
  Boy = 'Boy',
  Girl = 'Girl',
  Unknown = 'Unknown'
}

export type TeacherSpace = {
  __typename?: 'TeacherSpace';
  courseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Timetable = {
  __typename?: 'Timetable';
  events: Array<Maybe<TimetableEvent>>;
  id: Scalars['ID']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type TimetableEvent = {
  __typename?: 'TimetableEvent';
  endAt: Scalars['DateTime']['output'];
  grades: Array<Maybe<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  skillId?: Maybe<Scalars['String']['output']>;
  startAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type TimetableEventInput = {
  endAt: Scalars['DateTime']['input'];
  grades: Array<InputMaybe<Scalars['String']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  skillId?: InputMaybe<Scalars['String']['input']>;
  startAt: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type UpdateCourseInput = {
  gradeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  holidayZone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStudentInput = {
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  gradeId?: InputMaybe<Scalars['ID']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<StudentSex>;
};

export type UpdateTimetableInput = {
  events?: InputMaybe<Array<InputMaybe<TimetableEventInput>>>;
  id: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTimetableMutationVariables = Exact<{
  input: UpdateTimetableInput;
}>;


export type UpdateTimetableMutation = { __typename?: 'Mutation', updateTimetable: { __typename?: 'Timetable', id: string, title: string, tags: Array<string>, events: Array<{ __typename?: 'TimetableEvent', id: string, startAt: any, endAt: any, title: string, type: string, skillId?: string | null, grades: Array<string | null> } | null> } };

export type GetTimetableQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTimetableQuery = { __typename?: 'Query', timetable: { __typename?: 'Timetable', id: string, title: string, tags: Array<string>, events: Array<{ __typename?: 'TimetableEvent', id: string, startAt: any, endAt: any, title: string, type: string, skillId?: string | null, grades: Array<string | null> } | null> } };

export type GetTimetablesForSpaceQueryVariables = Exact<{
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetTimetablesForSpaceQuery = { __typename?: 'Query', timetablesByTags: Array<{ __typename?: 'Timetable', id: string, title: string }> };

export const UpdateTimetableDocument = gql`
    mutation UpdateTimetable($input: UpdateTimetableInput!) {
  updateTimetable(input: $input) {
    id
    title
    events {
      id
      startAt
      endAt
      title
      type
      skillId
      grades
    }
    tags
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTimetableGQL extends Apollo.Mutation<UpdateTimetableMutation, UpdateTimetableMutationVariables> {
    document = UpdateTimetableDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTimetableDocument = gql`
    query GetTimetable($id: ID!) {
  timetable(id: $id) {
    id
    title
    events {
      id
      startAt
      endAt
      title
      type
      skillId
      grades
    }
    tags
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTimetableGQL extends Apollo.Query<GetTimetableQuery, GetTimetableQueryVariables> {
    document = GetTimetableDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTimetablesForSpaceDocument = gql`
    query GetTimetablesForSpace($tags: [String!]!) {
  timetablesByTags(tags: $tags) {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTimetablesForSpaceGQL extends Apollo.Query<GetTimetablesForSpaceQuery, GetTimetablesForSpaceQueryVariables> {
    document = GetTimetablesForSpaceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }