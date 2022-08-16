import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { persons } from './persons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public inputControl = new FormControl('Daniel Andrés Castillo Pedroza', [
    Validators.required
  ]);

  public jobControl = new FormControl('Ingeniero de sistemas', [
    Validators.required
  ]);

  public cityControl = new FormControl('Valledupar, Cesar', [
    Validators.required
  ]);

  public radioControl = new FormControl(null);

  public persons = persons;

  public maxDate = new Date(2024, 1, 1);

  constructor() {}
}
