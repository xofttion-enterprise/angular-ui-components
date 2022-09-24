import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  ModalComponentService,
  PopupComponentService,
  required,
  SidenavMenuElement,
  SnackbarComponentService
} from 'projects';
import { persons, personsAdd } from './persons';

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

  public nameControl = new FormControl(null, [required]);

  public persons = persons;

  public maxDate = new Date(2024, 1, 1);

  public selectControl = new FormControl(null);

  public visibleNav = true;

  public condenseNav = true;

  public progress = false;

  public requestData = false;

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
    private snackbarService: SnackbarComponentService,
    private popupService: PopupComponentService
  ) {
    console.log(new Date().isLeapYear());
  }

  public onSidenav(element: SidenavMenuElement): void {
    console.log(element);
  }

  public onAction(): void {
    this.popupService.launch({
      title: 'Xedger Application',
      subtitle: 'Confirmación',
      theme: 'happy',
      message:
        'Si quedaras varado en una isla… ¿Cuáles serían las 3 cosas que te ayudarían a sobrevivir física y mentalmente?',
      approved: {
        label: 'Aceptar'
      },
      reject: {
        label: 'Rechazar'
      }
    });
  }

  public onVisible(): void {
    this.visibleNav = !this.visibleNav;
  }

  public onCondense(): void {
    this.condenseNav = !this.condenseNav;
  }

  public onProgress(): void {
    this.progress = !this.progress;
  }

  public onRequest(value: string): void {
    this.requestData = true;

    setTimeout(() => {
      this.persons = this.persons.concat(personsAdd);
      this.requestData = false;
    }, 3000);
  }
}
