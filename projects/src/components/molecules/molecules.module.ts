import { NgModule } from '@angular/core';
import { AlertComponentModule } from './alert/alert.component.module';
import { BallotComponentModule } from './ballot/ballot.component.module';
import { ButtonProgressComponentModule } from './button-progress/button-progress.component.module';
import { CheckboxLabelComponentModule } from './checkbox-label/checkbox-label.component.module';
import { DayPickerComponentModule } from './day-picker/day-picker.component.module';
import { DropdownComponentModule } from './dropdown/dropdown.component.module';
import { MoneyFieldComponentModule } from './money-field/money-field.component.module';
import { MonthPickerComponentModule } from './month-picker/month-picker.component.module';
import { PaginationComponentModule } from './pagination/pagination.component.module';
import { RadiobuttonLabelComponentModule } from './radiobutton-label/radiobutton-label.component.module';
import { SidenavMenuComponentModule } from './sidenav-menu/sidenav-menu.component.module';
import { SidenavProfileComponentModule } from './sidenav-profile/sidenav-profile.component.module';
import { SliderComponentModule } from './slider/slider.component.module';
import { SwitchLabelComponentModule } from './switch-label/switch-label.component.module';
import { TextFieldComponentModule } from './text-field/text-field.component.module';
import { ToolbarComponentModule } from './toolbar/toolbar.component.module';
import { YearPickerComponentModule } from './year-picker/year-picker.component.module';

const components = [
  AlertComponentModule,
  BallotComponentModule,
  ButtonProgressComponentModule,
  CheckboxLabelComponentModule,
  DayPickerComponentModule,
  DropdownComponentModule,
  MoneyFieldComponentModule,
  MonthPickerComponentModule,
  PaginationComponentModule,
  RadiobuttonLabelComponentModule,
  SidenavMenuComponentModule,
  SidenavProfileComponentModule,
  SliderComponentModule,
  SwitchLabelComponentModule,
  TextFieldComponentModule,
  ToolbarComponentModule,
  YearPickerComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MoleculesComponentsModule {}
