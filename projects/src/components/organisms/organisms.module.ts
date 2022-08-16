import { NgModule } from '@angular/core';
import { SelectFieldComponentModule } from './select-field/select-field.component.module';

const components = [SelectFieldComponentModule];

@NgModule({
  imports: components,
  exports: components
})
export class OrganismsComponentsModule {}
