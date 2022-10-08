import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LottieComponent } from './lottie.component';

@NgModule({
  declarations: [LottieComponent],
  exports: [LottieComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LottieComponentModule {}
