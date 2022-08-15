import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {
  ButtonComponentModule,
  CheckboxLabelComponentModule,
  RadiobuttonLabelComponentModule,
  SwitchLabelComponentModule,
  TextFieldComponentModule
} from 'projects';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    TextFieldComponentModule,
    ButtonComponentModule,
    CheckboxLabelComponentModule,
    RadiobuttonLabelComponentModule,
    SwitchLabelComponentModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
