import { NgModule } from '@angular/core';
import { AvatarComponentModule } from './avatar/avatar.component.module';
import { BreadcrumbComponentModule } from './breadcrumb/breadcrumb.component.module';
import { ButtonComponentModule } from './button/button.component.module';
import { CheckboxComponentModule } from './checkbox/checkbox.component.module';
import { IconComponentModule } from './icon/icon.component.module';
import { InputFieldComponentModule } from './input-field/input-field.component.module';
import { ProgressBarComponentModule } from './progress-bar/progress-bar.component.module';
import { RadiobuttonComponentModule } from './radiobutton/radiobutton.component.module';
import { SwitchComponentModule } from './switch/switch.component.module';

const components = [
  AvatarComponentModule,
  BreadcrumbComponentModule,
  ButtonComponentModule,
  CheckboxComponentModule,
  IconComponentModule,
  InputFieldComponentModule,
  ProgressBarComponentModule,
  RadiobuttonComponentModule,
  SwitchComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class AtomsComponentsModule {}
