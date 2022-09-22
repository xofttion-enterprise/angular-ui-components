import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponentModule } from '../../atoms';
import { PopupComponent } from './popup.component';
import { PopupComponentService } from './popup.component.service';

@NgModule({
  imports: [CommonModule, OverlayModule, ButtonComponentModule],
  declarations: [PopupComponent],
  exports: [PopupComponent],
  providers: [PopupComponentService]
})
export class PopupComponentModule {}
