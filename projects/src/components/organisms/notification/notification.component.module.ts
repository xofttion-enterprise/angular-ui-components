import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponentModule } from '../../atoms';
import { NotificationComponent } from './notification.component';
import { NotificationComponentService } from './notification.component.service';

@NgModule({
  imports: [CommonModule, OverlayModule, ButtonComponentModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  providers: [NotificationComponentService]
})
export class NotificationComponentModule {}
