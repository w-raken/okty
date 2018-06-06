import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Notification } from '../../models/notification.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  message: Notification;
  private subscription: Subscription;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.subscription = this.messageService.getObservable().subscribe(
      notification => {
        this.message = notification;
        setTimeout(() => {
          this.message = null;
        }, 2000);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
