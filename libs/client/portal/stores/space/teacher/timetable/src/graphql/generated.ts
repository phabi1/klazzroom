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

export type Contact = {
  __typename?: 'Contact';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  emails: Array<Contact>;
  firstname: Scalars['String']['output'];
  /** Contact ID */
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  phones: Array<Contact>;
};

export type ContactInput = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Course = {
  __typename?: 'Course';
  /** Worked days */
  days: Array<Scalars['String']['output']>;
  /** Grades in the course */
  grades: Array<Grade>;
  /** Course ID */
  id: Scalars['ID']['output'];
  /** Students in the course */
  students: Array<Student>;
};

export type CreateContactInfoInput = {
  emails: Array<ContactInput>;
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  phones: Array<ContactInput>;
};

export type CreateCourseInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateGradeInput = {
  /** Title of grade */
  title: Scalars['String']['input'];
};

export type CreateStudentInput = {
  /** Birthday of student */
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  /** Comments */
  comments?: InputMaybe<Scalars['String']['input']>;
  /** Course ID */
  course: Scalars['String']['input'];
  /** Firstname of student */
  firstname: Scalars['String']['input'];
  /** Grade of student */
  grade: Scalars['ID']['input'];
  /** Lastname of student */
  lastname: Scalars['String']['input'];
  /** Sex of student */
  sex: Sex;
};

export type CreateTeacherSpaceInput = {
  /** Title of space */
  title: Scalars['String']['input'];
};

export type CreateTimetableInput = {
  /** Timetable title */
  title: Scalars['String']['input'];
};

export type EventInput = {
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Grade = {
  __typename?: 'Grade';
  /** Grade ID */
  id: Scalars['ID']['output'];
  /** Title of grade */
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addContact: ContactInfo;
  createCourse: Course;
  createGrade: Grade;
  createStudent: Student;
  createTeacherSpace: Space;
  createTimetable: Timetable;
  removeContact: ContactInfo;
  removeCourse: Course;
  removeGrade: Grade;
  removeSpace: SpaceResult;
  removeTimetable: Timetable;
  updateContact: ContactInfo;
  updateCourse: Course;
  updateGrade: Grade;
  updateStudent: Student;
  updateTeacherSpace: Space;
  updateTimetable: Timetable;
};


export type MutationAddContactArgs = {
  input: CreateContactInfoInput;
  student: Scalars['String']['input'];
};


export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateGradeArgs = {
  input: CreateGradeInput;
};


export type MutationCreateStudentArgs = {
  input: CreateStudentInput;
};


export type MutationCreateTeacherSpaceArgs = {
  input: CreateTeacherSpaceInput;
};


export type MutationCreateTimetableArgs = {
  input: CreateTimetableInput;
};


export type MutationRemoveContactArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveGradeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSpaceArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTimetableArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateContactArgs = {
  id: Scalars['String']['input'];
  input: UpdateContactInfoInput;
};


export type MutationUpdateCourseArgs = {
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateGradeArgs = {
  input: UpdateGradeInput;
};


export type MutationUpdateStudentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateStudentInput;
};


export type MutationUpdateTeacherSpaceArgs = {
  input: UpdateTeacherSpaceInput;
};


export type MutationUpdateTimetableArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTimetableInput;
};

export type Query = {
  __typename?: 'Query';
  course: Course;
  grade: Grade;
  grades: Array<Grade>;
  space: SpaceResult;
  spaces: Array<Maybe<SpaceResult>>;
  timetable: Timetable;
  timetables: Array<Timetable>;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGradeArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySpaceArgs = {
  id: Scalars['String']['input'];
};


export type QueryTimetableArgs = {
  id: Scalars['ID']['input'];
};

export enum Sex {
  Boy = 'Boy',
  Girl = 'Girl',
  Unknown = 'Unknown'
}

export type Space = {
  __typename?: 'Space';
  /** Space ID */
  id: Scalars['ID']['output'];
  /** Space title */
  title: Scalars['String']['output'];
  /** User ID */
  user: Scalars['String']['output'];
};

export type SpaceResult = TeacherSpace;

export type Student = {
  __typename?: 'Student';
  /** Birthday of student */
  birthday?: Maybe<Scalars['DateTime']['output']>;
  /** Comments */
  comments: Scalars['String']['output'];
  /** Contacts */
  contacts: Array<ContactInfo>;
  /** Firstname of student */
  firstname: Scalars['String']['output'];
  /** Grade of student */
  grade: Grade;
  /** Student ID */
  id: Scalars['ID']['output'];
  /** Lastname of student */
  lastname: Scalars['String']['output'];
  /** Sex of student */
  sex: Sex;
};

export type TeacherSpace = {
  __typename?: 'TeacherSpace';
  /** Course ID */
  course: Scalars['String']['output'];
  /** Space ID */
  id: Scalars['ID']['output'];
  /** Space title */
  title: Scalars['String']['output'];
  /** User ID */
  user: Scalars['String']['output'];
};

export type Timetable = {
  __typename?: 'Timetable';
  /** Events of timetable */
  events: Array<TimetableEvent>;
  /** Example field (placeholder) */
  id: Scalars['ID']['output'];
  /** Timetable title */
  title: Scalars['String']['output'];
};

export type TimetableEvent = {
  __typename?: 'TimetableEvent';
  /** End date of event */
  end: Scalars['DateTime']['output'];
  /** Event ID */
  id: Scalars['ID']['output'];
  /** Start date of event */
  start: Scalars['DateTime']['output'];
  /** Event title */
  title: Scalars['String']['output'];
  /** Type of event */
  type: Scalars['String']['output'];
};

export type UpdateContactInfoInput = {
  emails?: InputMaybe<Array<ContactInput>>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<ContactInput>>;
};

export type UpdateCourseInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateGradeInput = {
  id: Scalars['ID']['input'];
  /** Title of grade */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStudentInput = {
  /** Birthday of student */
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  /** Comments */
  comments?: InputMaybe<Scalars['String']['input']>;
  /** Firstname of student */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Grade of student */
  grade?: InputMaybe<Scalars['ID']['input']>;
  /** Lastname of student */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** Sex of student */
  sex?: InputMaybe<Sex>;
};

export type UpdateTeacherSpaceInput = {
  /** Space ID */
  id: Scalars['String']['input'];
  /** Title of space */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTimetableInput = {
  /** Timetable events */
  events: Array<EventInput>;
  /** Timetable title */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTimetableMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateTimetableInput;
}>;


export type UpdateTimetableMutation = { __typename?: 'Mutation', updateTimetable: { __typename?: 'Timetable', id: string } };

export type GetTimetablesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimetablesQuery = { __typename?: 'Query', timetables: Array<{ __typename?: 'Timetable', id: string, title: string, events: Array<{ __typename?: 'TimetableEvent', id: string, type: string, title: string, start: any, end: any }> }> };

export const UpdateTimetableDocument = gql`
    mutation UpdateTimetable($id: ID!, $input: UpdateTimetableInput!) {
  updateTimetable(id: $id, input: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTimetableGQL extends Apollo.Mutation<UpdateTimetableMutation, UpdateTimetableMutationVariables> {
    override document = UpdateTimetableDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTimetablesDocument = gql`
    query GetTimetables {
  timetables {
    id
    title
    events {
      id
      type
      title
      start
      end
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTimetablesGQL extends Apollo.Query<GetTimetablesQuery, GetTimetablesQueryVariables> {
    override document = GetTimetablesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }