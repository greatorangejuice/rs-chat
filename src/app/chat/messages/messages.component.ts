import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../shared/chat.service';
import {DataModel} from '../../shared/models/data.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'rs-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private chatService: ChatService) {}
  private url = 'ws://st-chat.shas.tel';
  data: DataModel;
  ngOnInit(): void {

    this.chatService.connect(this.url);
    this.chatService.messagesResponse
      .subscribe(
        (req) => {
          console.log(req);
          this.data = req;
          // Здесь вручную запустить обновление контента
        }
      );
  }

}


