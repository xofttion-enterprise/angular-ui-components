import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalComponentService, SnackbarComponentService } from 'projects';
import { persons } from './persons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public inputControl = new FormControl('1065642202', [Validators.required]);

  public jobControl = new FormControl('Ingeniero de sistemas', [
    Validators.required
  ]);

  public cityControl = new FormControl('Valledupar, Cesar', [
    Validators.required
  ]);

  public radioControl = new FormControl(null);

  public persons = persons;

  public maxDate = new Date(2024, 1, 1);

  constructor(
    private modalService: ModalComponentService,
    private snackbarService: SnackbarComponentService
  ) {
    snackbarService.happy(
      'Lets take a look at 10 fun push examples across the food, gaming, eCommerce, mhealth, and media industries and break down what they do well.',
      'Store journal in Platform'
    );
  }
}
