import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {
  ButtonComponentModule,
  CheckboxLabelComponentModule,
  MoneyFieldComponentModule,
  RadiobuttonLabelComponentModule,
  SwitchLabelComponentModule,
  TextFieldComponentModule
} from 'projects';
import localeCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCo);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    TextFieldComponentModule,
    MoneyFieldComponentModule,
    ButtonComponentModule,
    CheckboxLabelComponentModule,
    RadiobuttonLabelComponentModule,
    SwitchLabelComponentModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }]
})
export class AppModule {}
