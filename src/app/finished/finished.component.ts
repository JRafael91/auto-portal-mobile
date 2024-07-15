import { Component, inject, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, ItemEventData } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular';
import { IOrder } from '../interfaces/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'Browse',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss'],
})
export class FinishedComponent implements OnInit {

  private readonly orderService = inject(OrderService);
  private readonly routerExtensions = inject(RouterExtensions);

  orders: IOrder[];

  search: string = '';

  imageUrl: string;

  ngOnInit(): void {
    this.getOrders();
  }

  onItemTap(item: ItemEventData) {
    const order = this.orders[item.index];
    this.routerExtensions.navigate(['/orders_finished/details', order.uid], {
      transition: {
        name: 'slide',
      },
    })
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  private getOrders() {
    this.orderService.getOrdersFinished().subscribe(data => {
      this.orders = data;
    });
  }
}
