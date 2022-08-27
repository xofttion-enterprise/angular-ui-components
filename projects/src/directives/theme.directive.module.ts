import { NgModule } from '@angular/core';
import { ThemeDirective } from './theme.directive';

@NgModule({
  declarations: [ThemeDirective],
  exports: [ThemeDirective]
})
export class ThemeDirectiveModule {}
