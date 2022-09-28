import { NgModule } from '@angular/core';
import { AvatarComponentModule } from './avatar/avatar.component.module';
import { BreadcrumbComponentModule } from './breadcrumb/breadcrumb.component.module';
import { ButtonActionComponentModule } from './button-action/button-action.component.module';
import { ButtonComponentModule } from './button/button.component.module';
import { CheckboxComponentModule } from './checkbox/checkbox.component.module';
import { IconComponentModule } from './icon/icon.component.module';
import { InputFieldComponentModule } from './input-field/input-field.component.module';
import { PosterComponentModule } from './poster/poster.component.module';
import { ProgressBarComponentModule } from './progress-bar/progress-bar.component.module';
import { ProgressCircularComponentModule } from './progress-circular/progress-circular.component.module';
import { RadiobuttonComponentModule } from './radiobutton/radiobutton.component.module';
import { SidenavElementComponentModule } from './sidenav-element/sidenav-element.component.module';
import { SkeletonTextComponentModule } from './skeleton-text/skeleton-text.component.module';
import { SwitchComponentModule } from './switch/switch.component.module';

const components = [
  AvatarComponentModule,
  BreadcrumbComponentModule,
  ButtonComponentModule,
  ButtonActionComponentModule,
  CheckboxComponentModule,
  IconComponentModule,
  InputFieldComponentModule,
  PosterComponentModule,
  ProgressBarComponentModule,
  ProgressCircularComponentModule,
  RadiobuttonComponentModule,
  SidenavElementComponentModule,
  SkeletonTextComponentModule,
  SwitchComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class AtomsComponentsModule {}
