import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../messages.model'
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact('1');
    // const contact: Contact = this.contactService.getContact(this.message.sender);
    console.log(this.message.sender)
    console.log(contact);
    this.messageSender = contact.name;
  }

}