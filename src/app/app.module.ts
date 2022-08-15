import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ButtonComponentModule, TextFieldComponentModule } from 'projects';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    TextFieldComponentModule,
    ButtonComponentModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
