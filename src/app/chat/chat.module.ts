import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { InputMessageComponent } from './input-message/input-message.component';
import {ChatRoutingModule} from './chat-routing.module';
import {MatBadgeModule} from '@angular/material';

@NgModule({
  declarations: [
    ChatComponent,
    MessagesComponent,
    InputMessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    MatBadgeModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {}
