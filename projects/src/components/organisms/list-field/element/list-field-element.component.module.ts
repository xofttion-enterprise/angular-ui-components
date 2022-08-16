import { NgModule } from '@angular/core';
import { BallotComponentModule } from 'projects/src/components/molecules/ballot/ballot.component.module';
import { ListFieldElementComponent } from './list-field-element.component';

@NgModule({
  imports: [BallotComponentModule],
  declarations: [ListFieldElementComponent],
  exports: [ListFieldElementComponent]
})
export class ListFieldElementComponentModule {}
