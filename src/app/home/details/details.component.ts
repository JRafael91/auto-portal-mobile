import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { IOrder } from '~/app/interfaces/order';
import { OrderService } from '~/app/services/order.service';

@Component({
  selector: 'ns-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  private readonly routerExtensions = inject(RouterExtensions);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);


  private readonly uid = this.activatedRoute.snapshot.params['uid'];
  order: IOrder|null;

  ngOnInit(): void {
    this.getOrder();
  }

  goBack() {
    this.routerExtensions.back();
  }

  private getOrder() {
    this.orderService.getOrder(this.uid).subscribe(data => {
      this.order = data;
    });
  }

}