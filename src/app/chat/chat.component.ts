import {Component, OnInit} from '@angular/core';
import {ChatService} from '../shared/chat.service';
import {DataModel} from '../shared/models/data.model';
import {FormControl, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'rs-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService) {}
  private url = 'ws://st-chat.shas.tel';
  data: DataModel;
  form: FormGroup;
  ngOnInit(): void {
    // this.form = new FormGroup({
    //   request: new FormControl('', Validators.required),
    // });
    //
    // this.chatService.connect(this.url);
    // this.chatService.messagesResponse
    //   .subscribe(
    //     (req) => {
    //       console.log(req);
    //       this.data = req;
    //       // Здесь вручную запустить обновление контента
    //     }
    //   );
  }
}
