import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { authGuard } from './utils/auth.guard'

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'auth',
    loadChildren: () => import('~/app/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: 'orders_finished',
    loadChildren: () => import('~/app/finished/finished.module').then((m) => m.FinishedModule),
  }
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
