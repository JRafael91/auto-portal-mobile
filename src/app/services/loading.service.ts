import { Injectable } from '@angular/core';
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { StackLayout } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingIndicator: LoadingIndicator;


  constructor() {
    this.loadingIndicator = new LoadingIndicator();
  }

  show(message: string) {
    const someStackLayout = new StackLayout();
    const options: OptionsCommon = {
      message: message,
      progress: 0.65,
      margin: 10,
      dimBackground: true,
      color: '#000000',
      mode: Mode.Indeterminate,
      userInteractionEnabled: false,
      hideBezel: true,
      android: {
        view: someStackLayout.android,
        max: 100,
        cancelable: false,
        cancelListener: function (dialog) {
          console.log('Loading cancelled');
        },
        elevation: 24
      }
    };
    this.loadingIndicator.show(options);
  }

  hide() {
    this.loadingIndicator.hide();
  }


}