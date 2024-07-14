import { Component, OnInit, inject } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, ItemEventData, ObservableArray } from '@nativescript/core'
import { OrderService } from '../services/order.service'
import { IOrder } from '../interfaces/order';
import { LoadingService } from '../services/loading.service';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  private readonly orderService = inject(OrderService);
  private readonly routerExtensions = inject(RouterExtensions);

  orders: IOrder[];

  search: string = '';

  refreshSubscription: Subscription;

  ngOnInit(): void {
    this.refreshSubscription = this.orderService.refresh$.subscribe(() => {
      this.getOrders();
    });
    this.getOrders();
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.refreshSubscription.unsubscribe();
  }

  onItemTap(item: ItemEventData) {
    const order = this.orders[item.index];
    this.routerExtensions.navigate(['/home/details', order.uid], {
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
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }
}
