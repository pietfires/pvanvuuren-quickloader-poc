import { Component } from '@angular/core';
import { MessageService } from '../provider/message'
import { Subscription, Observable, of } from 'rxjs';
import { salesOrderModel } from 'src/models/salesOrder';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'skeleton-pocnew';
  message: string[];
  subscription: Subscription;
  observable: any;
  promise: any;
  salesOrder: salesOrderModel;
  constructor(private messageService: MessageService) {
    this.observable = this.messageService.getMessage().subscribe((data) => {

      if (!this.salesOrder && (data.item == '' && data.price == 0 && data.quantity == 0)) return;

      if (!this.salesOrder && !(data.item == '' && data.price == 0 && data.quantity == 0)) {
        this.salesOrder = new salesOrderModel(data.item, data.quantity, data.price);
      } else {
        this.salesOrder.item = data.item;
        this.salesOrder.price = data.price;
        this.salesOrder.quantity = data.quantity;
      }
      if (data.item == '' && data.price == 0 && data.quantity == 0) {
        this.salesOrder = undefined;
      }
    });
  }
  sendMessage(): void {
    this.messageService.sendMessage(new salesOrderModel('Avocados', 40, 4));
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

}

