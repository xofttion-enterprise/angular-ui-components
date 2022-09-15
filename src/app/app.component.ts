import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  ModalComponentService,
  SidenavMenuElement,
  SnackbarComponentService
} from 'projects';
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

  public selectControl = new FormControl(null);

  public menu: SidenavMenuElement[] = [
    {
      icon: 'activity',
      label: 'Reportes contable'
    },
    {
      icon: 'archive',
      label: 'Catalogo de cuentas',
      disabled: true
    },
    {
      icon: 'trash',
      label: 'Registrar asiento contable'
    }
  ];

  constructor(
    private modalService: ModalComponentService,
    private snackbarService: SnackbarComponentService
  ) {
    snackbarService.xofttion(
      'Recuerda! Es indispensable que diligencie todos los campos al momento de realizar su pedido, esto determinará la eficiencia de su entrega',
      'Store journal in Platform',
      'xofttion'
    );
  }

  public onSidenav(element: SidenavMenuElement): void {
    console.log(element);
  }

  public onAction(): void {
    this.selectControl.setValue('Daniel Andrés Castillo Pedroza');
  }
}
