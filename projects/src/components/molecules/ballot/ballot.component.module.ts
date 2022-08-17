import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponentModule } from '../../atoms/avatar/avatar.component.module';
import { BallotComponent } from './ballot.component';

@NgModule({
  imports: [CommonModule, AvatarComponentModule],
  declarations: [BallotComponent],
  exports: [BallotComponent]
})
export class BallotComponentModule {}
