import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableComponent } from './datatable.component';
import { DatatableHeaderComponentModule } from './header/datatable-header.component.module';

@NgModule({
  declarations: [DatatableComponent],
  imports: [CommonModule, DatatableHeaderComponentModule],
  exports: [DatatableComponent]
})
export class DatatableComponentModule {}
