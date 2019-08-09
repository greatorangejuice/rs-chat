import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChatModule} from './chat/chat.module';
import {ChatService} from './shared/chat.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material/material.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
