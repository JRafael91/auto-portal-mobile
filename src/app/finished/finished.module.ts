import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { FinishedRoutingModule } from './finished-routing.module'
import { FinishedComponent } from './finished.component'
import { FormsModule } from '@angular/forms'
import { OrderFilterPipe } from '../utils/order-filter.pipe'
import { EmptyComponent } from '../utils/empty.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FinishedRoutingModule,
    FormsModule,
    OrderFilterPipe,
    EmptyComponent,
  ],
  declarations: [FinishedComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FinishedModule {}
