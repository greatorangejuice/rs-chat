import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ChatService} from '../../shared/chat.service';

@Component({
  selector: 'rs-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.scss']
})
export class InputMessageComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  @ViewChild('name', {static: false}) private nickname: ElementRef;

  constructor(
    private chatService: ChatService
  ) { }

  ngAfterViewInit(): void {
    if (window.localStorage.getItem('nickname')) {
      this.nickname.nativeElement.value = window.localStorage.getItem('nickname');
    } else {
      this.nickname.nativeElement.value = 'Username';
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      request: new FormControl(''),
    });

  }

  sendMessage() {
    const request = this.form.value.request;
    this.form.reset();
    this.chatService.send(request);
  }

  updateName() {
    console.log(this.nickname.nativeElement.value);
    let newName = this.nickname.nativeElement.value;
    if (newName.length === 0) {
      newName = 'I forgot to come up with a nickname';
    }
    window.localStorage.setItem('nickname', newName);
    this.chatService.changeName(newName);
  }
}
