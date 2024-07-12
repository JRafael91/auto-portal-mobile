import { Component, inject, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly routerExtensions = inject(RouterExtensions);
  public readonly auth = inject(AuthService);


  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase


  ngOnInit(): void {
    this._activatedUrl = '/home'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }

  logout() {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    this.auth.logout().subscribe({
      next: () => {
        sideDrawer.closeDrawer()
        this.routerExtensions.navigate(['/auth'], { clearHistory: true, transition: { name: 'fade' } });
      },
    });
  }
}
