import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from '../interfaces/order';

@Pipe({
  name: 'orderFilter',
  standalone: true
})
export class OrderFilterPipe implements PipeTransform {
  
  transform(items: IOrder[], filter: string): IOrder[] {
    if(filter.length > 0){
      return items.filter(item => item.customer.toLowerCase().includes(filter.toLowerCase())
      || item.uid.toLowerCase().includes(filter.toLowerCase()));
    }
    return items;
  }
}