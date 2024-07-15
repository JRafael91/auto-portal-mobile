import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { environment } from '../environments/environment';
import { IOrder } from '../interfaces/order';
import { catchError, delay, tap } from 'rxjs/operators';
import { lastValueFrom, of, Subject } from 'rxjs';
import { File } from "@nativescript/core";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API_URL = environment.API_URL;

  public refresh$ = new Subject<boolean>();

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getOrders() {
    return this.http.get<IOrder[]>(`${this.API_URL}/orders/technic`)
    .pipe(
      catchError((err) => {
        this.alertService.error('Error', `${err.error.message}`);
        return of([]);
      })
    )
  }

  getOrder(uid: string) {
    return this.http.get<IOrder>(`${this.API_URL}/orders/${uid}`)
    .pipe(
      catchError((err) => {
        this.alertService.error('Error', `${err.error.message}`);
        return of(null);
      })
    )
  }

  updateStatus(order: IOrder, status: string) {
    return this.http.put<void>(`${this.API_URL}/orders/${order.id}`, {status})
    .pipe(
      delay(1000),
      tap(() => this.refresh$.next(true)),
      catchError((err) => {
        this.alertService.error('Error', `${err.error.message}`);
        return of(null);
      })
    )
  }

  async uploadImage(order: IOrder, file: string, filename: string) {
    
    return await lastValueFrom(
      this.http.post(`${this.API_URL}/orders/upload_image/${order.id}`, {file, filename})
      .pipe(
        catchError((err) => {
          this.alertService.error('Error', `${err.error.message}`);
          return of(null);
        })
      ));
  }
}