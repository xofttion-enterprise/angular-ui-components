import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet.component';
import { BottomSheetComponentService } from './bottom-sheet.component.service';

@NgModule({
  imports: [OverlayModule],
  declarations: [BottomSheetComponent],
  exports: [BottomSheetComponent],
  providers: [BottomSheetComponentService]
})
export class BottomSheetComponentModule {}
