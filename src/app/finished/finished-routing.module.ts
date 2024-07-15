import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { FinishedComponent } from './finished.component'

const routes: Routes = [
  { path: '', component: FinishedComponent },
  { path: 'details/:uid', loadComponent: () => import('../components/details/details.component').then(m => m.DetailsComponent)},
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class FinishedRoutingModule {}
