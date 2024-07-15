import { Component, inject, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {

  private readonly routerExtensions = inject(RouterExtensions);

  imageUrl: string;

  ngOnInit(): void {
  }
}
