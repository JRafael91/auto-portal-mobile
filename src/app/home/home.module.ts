import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'
import { FormsModule } from '@angular/forms'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { OrderFilterPipe } from '../utils/order-filter.pipe'
import { EmptyComponent } from '../utils/empty.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FormsModule,
    HomeRoutingModule,
    OrderFilterPipe,
    EmptyComponent,
  ],
  declarations: [HomeComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}
