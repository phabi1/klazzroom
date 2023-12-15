import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateContactInfoInput } from '../../dto/create-contact.input';
import { UpdateContactInfoInput } from '../../dto/update-contact.input';
import { Course } from '../../entities/course.entity';

@Injectable()
export class ContactService {
  constructor(@InjectModel('Course') private model: Model<Course>) {}

  async addContact(input: CreateContactInfoInput, student: string) {
    const course = await this.model.findOne({
      ['students._id']: new Types.ObjectId(student),
    });

    const studentIndex = course.students.findIndex(
      (s) => s._id.toString() === student
    );

    course.students[studentIndex].contacts.push({
      firstname: input.firstname,
      lastname: input.lastname,
      emails: input.emails,
      phones: input.phones,
    });
    await course.save();

    return course.students[studentIndex].contacts[
      course.students[0].contacts.length - 1
    ];
  }

  async updateContact(id: string, input: UpdateContactInfoInput) {
    const course = await this.model.findOne({
      ['students.contacts._id']: new Types.ObjectId(id),
    });

    let contact;
    for (const student of course.students) {
      contact = student.contacts.find((c) => c.id === id);
      if (contact) {
        break;
      }
    }

    contact.firstname = input.firstname;
    contact.lastname = input.lastname;
    contact.emails = input.emails;
    contact.phones = input.phones;

    await course.save();

    return contact;
  }

  async removeContact(id: string) {
    const course = await this.model.findOne({
      ['students.contacts._id']: new Types.ObjectId(id),
    });

    let contact;
    for (const student of course.students) {
      const contactIndex = student.contacts.findIndex(
        (c) => c.id.toString() === id
      );
      if (contactIndex !== -1) {
        contact = student.contacts.splice(contactIndex, 1);
        break;
      }
    }

    await course.save();

    return contact[0];
  }
}
