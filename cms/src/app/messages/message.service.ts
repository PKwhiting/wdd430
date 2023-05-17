import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    //  return the list of contacts
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages.find(message => {
        // return this.contact.id === id;
        return message.id === id;
    });
}

  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}