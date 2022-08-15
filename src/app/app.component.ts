import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public inputControl = new FormControl('Daniel Andres Castillo', [
    Validators.required
  ]);

  public jobControl = new FormControl('Ingeniero de sistemas', [
    Validators.required
  ]);

  public cityControl = new FormControl('Valledupar, Cesar', [
    Validators.required
  ]);

  public radioControl = new FormControl(null);

  constructor() {}
}
