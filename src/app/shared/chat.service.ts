import {EventEmitter, Injectable} from '@angular/core';
import {DataModel, RequestMessage} from './models/data.model';


@Injectable()
export class ChatService {
  private data: DataModel;

  messagesResponse = new EventEmitter();
  private url = 'ws://st-chat.shas.tel';

  connect(url: string) {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.onmessage = (event) => {
        this.data = JSON.parse(event.data);
        this.messagesResponse.emit(this.data);
      };
    };
  }

  sendMessage(requestMessage: RequestMessage) {
    const ws = new WebSocket(this.url);
    ws.send(requestMessage);
  }
}
