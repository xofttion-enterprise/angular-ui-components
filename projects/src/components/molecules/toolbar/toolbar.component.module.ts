import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../../atoms/icon/icon.component.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarComponentModule {}
