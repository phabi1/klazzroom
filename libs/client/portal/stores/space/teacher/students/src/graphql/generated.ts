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
  removeContact: ContactInfo;
  removeCourse: Course;
  removeGrade: Grade;
  removeSpace: SpaceResult;
  updateContact: ContactInfo;
  updateCourse: Course;
  updateGrade: Grade;
  updateStudent: Student;
  updateTeacherSpace: Space;
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

export type Query = {
  __typename?: 'Query';
  course: Course;
  grade: Grade;
  grades: Array<Grade>;
  space: SpaceResult;
  spaces: Array<Maybe<SpaceResult>>;
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

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInfoInput;
  student: Scalars['String']['input'];
}>;


export type CreateContactMutation = { __typename?: 'Mutation', addContact: { __typename?: 'ContactInfo', id: string, firstname: string, lastname: string, emails: Array<{ __typename?: 'Contact', type: string, value: string }>, phones: Array<{ __typename?: 'Contact', type: string, value: string }> } };

export type CreateStudentMutationVariables = Exact<{
  student: CreateStudentInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string, firstname: string, lastname: string, birthday?: any | null, sex: Sex, comments: string, grade: { __typename?: 'Grade', id: string, title: string }, contacts: Array<{ __typename?: 'ContactInfo', id: string, firstname: string, lastname: string, emails: Array<{ __typename?: 'Contact', type: string, value: string }>, phones: Array<{ __typename?: 'Contact', type: string, value: string }> }> } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutation', removeContact: { __typename?: 'ContactInfo', id: string } };

export type UpdateContactMutationVariables = Exact<{
  input: UpdateContactInfoInput;
  id: Scalars['String']['input'];
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'ContactInfo', id: string, firstname: string, lastname: string, emails: Array<{ __typename?: 'Contact', type: string, value: string }>, phones: Array<{ __typename?: 'Contact', type: string, value: string }> } };

export type UpdateStudentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  student: UpdateStudentInput;
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: string, firstname: string, lastname: string, birthday?: any | null, sex: Sex, comments: string, grade: { __typename?: 'Grade', id: string, title: string }, contacts: Array<{ __typename?: 'ContactInfo', id: string, firstname: string, lastname: string, emails: Array<{ __typename?: 'Contact', type: string, value: string }>, phones: Array<{ __typename?: 'Contact', type: string, value: string }> }> } };

export type GetStudentsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetStudentsQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, grades: Array<{ __typename?: 'Grade', id: string, title: string }>, students: Array<{ __typename?: 'Student', id: string, firstname: string, lastname: string, birthday?: any | null, sex: Sex, comments: string, grade: { __typename?: 'Grade', id: string, title: string }, contacts: Array<{ __typename?: 'ContactInfo', id: string, firstname: string, lastname: string, emails: Array<{ __typename?: 'Contact', type: string, value: string }>, phones: Array<{ __typename?: 'Contact', type: string, value: string }> }> }> } };

export const CreateContactDocument = gql`
    mutation CreateContact($input: CreateContactInfoInput!, $student: String!) {
  addContact(input: $input, student: $student) {
    id
    firstname
    lastname
    emails {
      type
      value
    }
    phones {
      type
      value
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateContactGQL extends Apollo.Mutation<CreateContactMutation, CreateContactMutationVariables> {
    override document = CreateContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateStudentDocument = gql`
    mutation CreateStudent($student: CreateStudentInput!) {
  createStudent(input: $student) {
    id
    firstname
    lastname
    grade {
      id
      title
    }
    birthday
    sex
    comments
    contacts {
      id
      firstname
      lastname
      emails {
        type
        value
      }
      phones {
        type
        value
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateStudentGQL extends Apollo.Mutation<CreateStudentMutation, CreateStudentMutationVariables> {
    override document = CreateStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveContactDocument = gql`
    mutation RemoveContact($id: String!) {
  removeContact(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveContactGQL extends Apollo.Mutation<RemoveContactMutation, RemoveContactMutationVariables> {
    override document = RemoveContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateContactDocument = gql`
    mutation UpdateContact($input: UpdateContactInfoInput!, $id: String!) {
  updateContact(input: $input, id: $id) {
    id
    firstname
    lastname
    emails {
      type
      value
    }
    phones {
      type
      value
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateContactGQL extends Apollo.Mutation<UpdateContactMutation, UpdateContactMutationVariables> {
    override document = UpdateContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateStudentDocument = gql`
    mutation UpdateStudent($id: ID!, $student: UpdateStudentInput!) {
  updateStudent(id: $id, input: $student) {
    id
    firstname
    lastname
    grade {
      id
      title
    }
    birthday
    sex
    comments
    contacts {
      id
      firstname
      lastname
      emails {
        type
        value
      }
      phones {
        type
        value
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateStudentGQL extends Apollo.Mutation<UpdateStudentMutation, UpdateStudentMutationVariables> {
    override document = UpdateStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetStudentsDocument = gql`
    query GetStudents($id: ID!) {
  course(id: $id) {
    id
    grades {
      id
      title
    }
    students {
      id
      firstname
      lastname
      grade {
        id
        title
      }
      birthday
      sex
      comments
      contacts {
        id
        firstname
        lastname
        emails {
          type
          value
        }
        phones {
          type
          value
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentsGQL extends Apollo.Query<GetStudentsQuery, GetStudentsQueryVariables> {
    override document = GetStudentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }