import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BallotComponentModule } from '../ballot/ballot.component.module';
import { SidenavProfileComponent } from './sidenav-profile.component';

@NgModule({
  imports: [CommonModule, BallotComponentModule],
  declarations: [SidenavProfileComponent],
  exports: [SidenavProfileComponent]
})
export class SidenavProfileComponentModule {}
