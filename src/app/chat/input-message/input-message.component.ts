import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../../shared/chat.service';

@Component({
  selector: 'rs-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.scss']
})
export class InputMessageComponent implements OnInit {
  form: FormGroup;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.form = new FormGroup({
      request: new FormControl('', Validators.required),
    });
  }

  sendMessage() {
    const request = this.form.value.request;
    this.form.reset();
    this.chatService.send(request);
  }

}
