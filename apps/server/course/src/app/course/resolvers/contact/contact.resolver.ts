import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateContactInfoInput } from '../../dto/create-contact.input';
import { ContactService } from '../../services/contact/contact.service';
import { CourseService } from '../../services/course/course.service';
import { UpdateContactInfoInput } from '../../dto/update-contact.input';
import { ContactInfo } from '../../entities/contact-info.entity';

@Resolver()
export class ContactResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly contactService: ContactService
  ) {}

  @Mutation(() => ContactInfo)
  addContact(
    @Args('input') input: CreateContactInfoInput,
    @Args('student') student: string
  ) {
    return this.contactService.addContact(input, student);
  }

  @Mutation(() => ContactInfo)
  updateContact(
    @Args('id') id: string,
    @Args('input') input: UpdateContactInfoInput
  ) {
    return this.contactService.updateContact(id, input);
  }

  @Mutation(() => ContactInfo)
  removeContact(@Args('id') id: string) {
    return this.contactService.removeContact(id);
  }
}
