import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule, ThemeDirectiveModule } from 'projects';
import { AppComponent } from './app.component';

registerLocaleData(localeCo);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ComponentsModule,
    ThemeDirectiveModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }]
})
export class AppModule {}
