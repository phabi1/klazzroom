export type Space = TeacherSpace | AdministratorSpace;

export interface TeacherSpace {
  id: string;
  type: string;
  title: string;
  course: string;
}

export interface AdministratorSpace {
  id: string;
  type: string;
  title: string;
}
