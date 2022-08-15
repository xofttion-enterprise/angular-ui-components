import { NgModule } from '@angular/core';
import { IconComponentModule } from '../icon/icon.component.module';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [IconComponentModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})
export class CheckboxComponentModule {}
