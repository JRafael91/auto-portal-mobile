import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptRouterModule } from '@nativescript/angular'
import { AuthComponent } from './auth.component'
import { Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [{ path: '', component: AuthComponent }]

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [AuthComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}