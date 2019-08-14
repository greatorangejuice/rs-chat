import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './models/data.model';
import {WebSocketSubject} from 'rxjs/webSocket';
import {map} from 'rxjs/operators';

@Injectable()
export class ChatService {

  messagesResponse = new EventEmitter();
  // private url = 'ws://st-chat.shas.tel';
  private url = 'wss://wssproxy.herokuapp.com/ ';
  public serverMessages = [];
  public clientMessage = '';
  public sender = 'Juice';

  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject(this.url);
    this.socket$
      .pipe(
        map( message => message.reverse() )
      )
      .subscribe(
        (message) => this.messagesResponse.emit(message),
        (err) => console.error(err),
        () => console.warn('Completed!')
      );
  }

  public send(requestMessage): void {
    this.clientMessage = requestMessage;
    const message = new Message(this.sender, this.clientMessage);
    this.serverMessages.push(message);
    this.socket$.next(message);
    this.clientMessage = '';
    // this.scroll();
  }

}
