import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonActionComponentModule } from '../../../atoms';
import {
  ButtonProgressComponentModule,
  ToolbarComponentModule
} from '../../../molecules';
import { DatatableHeaderComponent } from './datatable-header.component';

@NgModule({
  declarations: [DatatableHeaderComponent],
  imports: [
    CommonModule,
    ToolbarComponentModule,
    ButtonActionComponentModule,
    ButtonProgressComponentModule
  ],
  exports: [DatatableHeaderComponent]
})
export class DatatableHeaderComponentModule {}
