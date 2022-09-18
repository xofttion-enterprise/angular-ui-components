import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbComponentModule, IconComponentModule } from '../../atoms';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [CommonModule, IconComponentModule, BreadcrumbComponentModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarComponentModule {}
