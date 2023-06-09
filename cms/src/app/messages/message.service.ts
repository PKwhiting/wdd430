import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];
  maxMessageId: number; 

  constructor(private httpClient: HttpClient) {
    // this.messages = MOCKMESSAGES;
  }

  getMessages(){
    //  return the list of contacts
    this.httpClient
    .get('https://wdd430-cms-77739-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
       (contacts: Message[]) => { 
        this.messages = contacts;
        this.maxMessageId = this.getMaxId();
        //sort documents
        this.messages.sort((a, b) =>
          a.sender > b.sender ? 1 : a.sender < b.sender ? -1 : 0
        );

        //emit the next document list changed event
        this.messageChangedEvent.next(this.messages.slice());
      }, 
      (error) => {
      console.log(error);
      }
    );
  }

  storeMessages(){
    let messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders({'Content-Type': 'application/json'})

    this.httpClient.put("https://wdd430-cms-77739-default-rtdb.firebaseio.com/messages.json", messages, {
      headers: headers
    })
    .subscribe( () => {
      this.messageChangedEvent.next(this.messages.slice());
    })
  }

  getMaxId(): number {
    let maxId = 0;
    // let currentId;

    for (const message of this.messages){
      let currentId = Number(message.id);
      if(currentId > maxId){
        maxId = currentId;
      }
    }

    return maxId;
  }

  getMessage(id: string): Message {
    return this.messages.find(message => {
        // return this.contact.id === id;
        return message.id === id;
    });
}

  addMessage(message: Message){
    if (!message){
      return;
    }

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }
}