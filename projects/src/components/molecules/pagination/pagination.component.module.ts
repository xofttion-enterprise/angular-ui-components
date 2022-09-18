import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../../atoms';
import { PaginationComponent } from './pagination.component';
import { PaginationComponentPipe } from './pagination.component.pipe';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [PaginationComponentPipe]
})
export class PaginationComponentModule {}
