import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../icon/icon.component.module';
import { SkeletonTextComponentModule } from '../skeleton-text/skeleton-text.component.module';
import { SidenavElementComponent } from './sidenav-element.component';

@NgModule({
  imports: [CommonModule, IconComponentModule, SkeletonTextComponentModule],
  declarations: [SidenavElementComponent],
  exports: [SidenavElementComponent]
})
export class SidenavElementComponentModule {}
