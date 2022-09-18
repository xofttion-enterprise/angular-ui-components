import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../../atoms';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertComponentModule {}
