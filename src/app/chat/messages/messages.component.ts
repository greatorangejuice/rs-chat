import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../shared/chat.service';
import {DataModel} from '../../shared/models/data.model';

@Component({
  selector: 'rs-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    private changeDetector: ChangeDetectorRef,
  ) {}
  data: DataModel[] = [];
  isFirstConnect = true;
  isHaveUnreadMessages = false;
  unreadMessages = 0;

  @ViewChild('viewier', {static: false}) private viewer: ElementRef;

  ngOnInit(): void {
    this.chatService.messagesResponse
      .subscribe(
        (req: DataModel[]) => {
          this.data = this.data.concat(req);
          this.changeDetector.detectChanges();
          this.scroll();
          this.isFirstConnect = false;
        }
      );
  }

  private scroll(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  private getDiff(): number {
    if (!this.viewer) {
      return -1;
    }

    const nativeElement = this.viewer.nativeElement;
    return nativeElement.scrollHeight - (nativeElement.scrollTop + nativeElement.clientHeight);
  }

  private scrollToBottom(t = 1, b = 0): void {
    if (b < 1) {
      b = this.getDiff();
    }
    if (b > 130 && !this.isFirstConnect) {
      this.isHaveUnreadMessages = true;
      this.unreadMessages++;
      return;
    }
    if (b > 0 && t <= 120) {
      setTimeout(() => {
        const diff = this.easeInOutSin(t / 120) * this.getDiff();
        this.viewer.nativeElement.scrollTop += diff;
        this.scrollToBottom(++t, b);
        this.isHaveUnreadMessages = false;
        this.unreadMessages = 0;
      }, 1 / 60);
}
  }

  private easeInOutSin(t): number {
    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
  }


  public getSenderInitials(sender: string): string {
    return sender && sender.substring(0, 2).toLocaleUpperCase();
  }

  public getSenderColor(sender: string): string {
    const alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ';
    const initials = this.getSenderInitials(sender);
    const value = Math.ceil((alpha.indexOf(initials[0]) + alpha.indexOf(initials[1])) * 255 * 255 * 255 / 50);
    return '#' + value.toString(16).padEnd(6, '0');
  }

}
