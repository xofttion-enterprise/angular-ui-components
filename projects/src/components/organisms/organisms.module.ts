import { NgModule } from '@angular/core';
import { AutocompleteFieldComponentModule } from './autocomplete-field/autocomplete-field.component.module';
import { DatePickerComponentModule } from './date-picker/date-picker.component.module';
import { ModalComponentModule } from './modal/modal.component.module';
import { SelectFieldComponentModule } from './select-field/select-field.component.module';

const components = [
  AutocompleteFieldComponentModule,
  DatePickerComponentModule,
  ModalComponentModule,
  SelectFieldComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class OrganismsComponentsModule {}
