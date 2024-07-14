import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptCommonModule } from '@nativescript/angular';

@Component({
  selector: 'empty',
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout class="page__content">
      <Label class="page__content-icon far" text="&#xf1ea;"></Label>
      <Label class="page__content-placeholder" text="No hay resultados"></Label>
    </GridLayout>
  `,
  styles: [`
    Label {
      color: black;
    } 
  `]
})
export class EmptyComponent {

}