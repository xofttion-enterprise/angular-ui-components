import { NgModule } from '@angular/core';
import { AutocompleteFieldComponentModule } from './autocomplete-field/autocomplete-field.component.module';
import { SelectFieldComponentModule } from './select-field/select-field.component.module';

const components = [
  AutocompleteFieldComponentModule,
  SelectFieldComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class OrganismsComponentsModule {}
