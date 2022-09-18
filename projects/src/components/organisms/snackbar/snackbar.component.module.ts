import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../../atoms';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarComponentService } from './snackbar.component.service';

@NgModule({
  imports: [CommonModule, OverlayModule, IconComponentModule],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent],
  providers: [SnackbarComponentService]
})
export class SnackbarComponentModule {}
