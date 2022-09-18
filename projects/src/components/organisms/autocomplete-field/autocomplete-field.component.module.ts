import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteFieldComponent } from './autocomplete-field.component';
import {
  ButtonActionComponentModule,
  IconComponentModule,
  ProgressBarComponentModule
} from '../../atoms';
import { BallotComponentModule } from '../../molecules';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BallotComponentModule,
    IconComponentModule,
    ButtonActionComponentModule,
    ProgressBarComponentModule
  ],
  declarations: [AutocompleteFieldComponent],
  exports: [AutocompleteFieldComponent]
})
export class AutocompleteFieldComponentModule {}
