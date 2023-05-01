import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model'

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, "PSA", "BYUI is the best school", "jimmy"),
    new Message(2, "Devo", "Devo coming up on tuesday!", "Gimlet"),
    new Message(1, "Winter", "BYUI is the only school you can get frostbite at", "Bilbo Baggins")
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}