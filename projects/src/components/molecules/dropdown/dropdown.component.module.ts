import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownComponentService } from './dropdown.component.service';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
  providers: [DropdownComponentService]
})
export class DropdownComponentModule {}
