import { Module } from '@nestjs/common';
import { ContactsResolver } from '@app/contacts/contacts.resolver';

@Module({
  providers: [ContactsResolver],
})
export class ContactsModule {}
