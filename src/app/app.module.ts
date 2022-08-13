import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TextFieldComponentModule } from 'projects';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, TextFieldComponentModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
