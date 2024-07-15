import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import * as camera from "@nativescript/camera";
import { ImageSource } from "@nativescript/core";
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { EventData } from '@nativescript/core';
import { SegmentedBar, SegmentedBarItem } from '@nativescript/core/ui/segmented-bar';
import { IOrder } from '../../interfaces/order';
import { LoadingService } from '../../services/loading.service';
import { OrderService } from '../../services/order.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ns-details',
  standalone: true,
  templateUrl: './details.component.html',
  imports: [NativeScriptCommonModule],
  styleUrls: ['./details.component.scss'],
  schemas: [NO_ERRORS_SCHEMA],


})
export class DetailsComponent implements OnInit {

  private readonly routerExtensions = inject(RouterExtensions);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly loadingService = inject(LoadingService);


  private readonly uid = this.activatedRoute.snapshot.params['uid'];
  private readonly statusList = new Map<string, number>([
    ['GENERADO', 0],
    ['PROCESO', 1],
    ['FINALIZADO', 2],
  ])
  order: IOrder|null;
  status: number = 0;
  segmentedBarItems: Array<SegmentedBarItem> = [];
  readonly STORAGE_URL = environment.STORAGE_URL;

  constructor() {
    this.statusList.forEach((value, key) => {
      const item = new SegmentedBarItem();
      item.title = key;
      this.segmentedBarItems.push(item);
    });
  }

  ngOnInit(): void {
    this.getOrder();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  async takePhoto() {
    await camera.requestPermissions();

    const image =  await camera.takePicture({ width: 300, height: 300, keepAspectRatio: false, saveToGallery: false });
    const source = await ImageSource.fromAsset(image);
    const fileName = `${this.order.uid}_${new Date().getTime()}.jpg`;
    await this.uploadImage(source.toBase64String("jpeg"), fileName);
  }

  changeStatus(args: EventData) {
    const segmentedBar = args.object as SegmentedBar;
    const selectedStatus = segmentedBar.items[segmentedBar.selectedIndex].title;
    if(segmentedBar.isLoaded) {
      if(selectedStatus !== this.order?.status) {
        this.loadingService.show('Actualizando...');
        this.orderService.updateStatus(this.order, selectedStatus).subscribe(() => {
          this.loadingService.hide();
        })
      }
    }
  }

  private getOrder() {
    this.orderService.getOrder(this.uid).subscribe(data => {
      this.order = data;
      this.status = this.statusList.get(this.order.status);
    });
  }

  private async uploadImage(file: string, filename: string) {
    await this.orderService.uploadImage(this.order, file, filename);
    this.getOrder();
  }

}