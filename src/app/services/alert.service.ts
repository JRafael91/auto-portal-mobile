import { Injectable } from "@angular/core";
import { Dialogs } from '@nativescript/core'

@Injectable({
  providedIn: "root",
})
export class AlertService {

  error(title: string, message: string) {
    Dialogs.alert({
      title,
      message,
      okButtonText: 'OK',
      cancelable: true,
    });
  }
}