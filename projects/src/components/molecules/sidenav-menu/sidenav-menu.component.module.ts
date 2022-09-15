import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidenavElementComponentModule } from '../../atoms';
import { SidenavMenuComponent } from './sidenav-menu.component';

@NgModule({
  imports: [CommonModule, SidenavElementComponentModule],
  declarations: [SidenavMenuComponent],
  exports: [SidenavMenuComponent]
})
export class SidenavMenuComponentModule {}
