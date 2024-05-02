import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceName',
})
export class SpaceNamePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'TeacherSpace') {
      return 'Teacher';
    } else if (value === 'StudentSpace') {
      return 'Student';
    } else if (value === 'ParentSpace') {
      return 'Parent';
    } else if (value === 'AdministratorSpace') {
      return 'Administrator';
    }
    return value;
  }
}
