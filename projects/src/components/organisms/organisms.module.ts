import { NgModule } from '@angular/core';
import { AutocompleteFieldComponentModule } from './autocomplete-field/autocomplete-field.component.module';
import { BottomSheetComponentModule } from './bottom-sheet/bottom-sheet.component.module';
import { DateFieldComponentModule } from './date-field/date-field.component.module';
import { DatePickerComponentModule } from './date-picker/date-picker.component.module';
import { ModalComponentModule } from './modal/modal.component.module';
import { SelectFieldComponentModule } from './select-field/select-field.component.module';
import { SidenavComponentModule } from './sidenav/sidenav.component.module';
import { SnackbarComponentModule } from './snackbar/snackbar.component.module';

const components = [
  AutocompleteFieldComponentModule,
  BottomSheetComponentModule,
  DateFieldComponentModule,
  DatePickerComponentModule,
  ModalComponentModule,
  SelectFieldComponentModule,
  SidenavComponentModule,
  SnackbarComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class OrganismsComponentsModule {}
