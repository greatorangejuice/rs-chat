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
  public sender = window.localStorage.getItem('nickname');

  private socket$: WebSocketSubject<any>;

  constructor() {
    if (this.sender == null) {
      this.sender = 'Username';
    }
    this.connect();
    // this.socket$ = new WebSocketSubject(this.url);
    // this.socket$
    //   .pipe(
    //     map( message => message.reverse() )
    //   )
    //   .subscribe(
    //     (message) => this.messagesResponse.emit(message),
    //     (err) => this.socket$.retry(),
    //     () => console.warn('Completed!')
    //   );
  }

  public send(requestMessage): void {
    this.clientMessage = requestMessage;
    const message = new Message(this.sender, this.clientMessage);
    this.serverMessages.push(message);
    this.socket$.next(message);
    this.clientMessage = '';
  }

  public connect() {
    console.log('reconnect');
    this.socket$ = new WebSocketSubject(this.url);
    this.socket$
      .pipe(
        map( message => message.reverse() )
      )
      .subscribe(
        (message) => this.messagesResponse.emit(message),
        () => { setTimeout( () => {
          this.connect();
        }, 1000 ); },
        () => { setTimeout( () => {
          this.connect(); }, 1000 ); }
      );
  }

  public changeName(newName: string) {
    this.sender = newName;
  }
}
