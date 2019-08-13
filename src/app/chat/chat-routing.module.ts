import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat.component';
import {AppComponent} from '../app.component';

const routes: Routes = [
  {path: '', component: AppComponent, children: [
      {path: 'chat', component: ChatComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
