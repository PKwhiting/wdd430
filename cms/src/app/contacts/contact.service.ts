import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[]{
    //  return the list of contacts
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    if (/\d/.test(id)){
      return this.contacts.find((contact) => contact.id === id);
    }
    else {
      return this.contacts.find((contact) => contact.name === id);
    }
}


}