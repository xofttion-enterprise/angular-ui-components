import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public inputControl = new FormControl('Daniel Andres Castillo', [Validators.required]);
  public addressControl = new FormControl('Calle 44a # 5 bis 88', [Validators.required]);

  constructor() {}
}
