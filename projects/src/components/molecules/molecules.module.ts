import { NgModule } from '@angular/core';
import { BallotComponentModule } from './ballot/ballot.component.module';
import { CheckboxLabelComponentModule } from './checkbox-label/checkbox-label.component.module';
import { MoneyFieldComponentModule } from './money-field/money-field.component.module';
import { RadiobuttonLabelComponentModule } from './radiobutton-label/radiobutton-label.component.module';
import { SwitchLabelComponentModule } from './switch-label/switch-label.component.module';
import { TextFieldComponentModule } from './text-field/text-field.component.module';
import { YearPickerComponentModule } from './year-picker/year-picker.component.module';

const components = [
  BallotComponentModule,
  CheckboxLabelComponentModule,
  MoneyFieldComponentModule,
  RadiobuttonLabelComponentModule,
  SwitchLabelComponentModule,
  TextFieldComponentModule,
  YearPickerComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MoleculesComponentsModule {}
