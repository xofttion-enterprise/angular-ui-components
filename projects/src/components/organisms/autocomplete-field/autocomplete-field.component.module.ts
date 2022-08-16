import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteFieldComponent } from './autocomplete-field.component';
import { IconComponentModule } from '../../atoms/icon/icon.component.module';
import { BallotComponentModule } from '../../molecules/ballot/ballot.component.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BallotComponentModule,
    IconComponentModule
  ],
  declarations: [AutocompleteFieldComponent],
  exports: [AutocompleteFieldComponent]
})
export class AutocompleteFieldComponentModule {}
