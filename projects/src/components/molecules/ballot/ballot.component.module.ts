import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AvatarComponentModule,
  SkeletonTextComponentModule
} from '../../atoms';
import { BallotComponent } from './ballot.component';

@NgModule({
  imports: [CommonModule, AvatarComponentModule, SkeletonTextComponentModule],
  declarations: [BallotComponent],
  exports: [BallotComponent]
})
export class BallotComponentModule {}
