import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { dateFactory } from '@xofttion-enterprise/utils';
import {
  ActionDatatable,
  DatatableHeader,
  ModalComponentService,
  NotificationComponentService,
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

  public header: DatatableHeader = {
    title: 'Catálogo de documentos',
    subtitle: 'Registrados: 5 documento(s)',
    actions: [
      {
        label: 'Adjuntar',
        icon: 'attach',
        progressType: true,
        progress: () => {
          return this.progress;
        },
        onClick: () => {
          this.onVisible();
        }
      },
      {
        label: 'Eliminar',
        icon: 'trash',
        onClick: () => {
          this.onCondense();
        }
      },
      {
        label: 'Refrescar',
        icon: 'refresh',
        onClick: () => {
          this.onProgress();
        }
      }
    ]
  };

  constructor(
    private modalService: ModalComponentService,
    private snackbarService: SnackbarComponentService,
    private popupService: PopupComponentService,
    private notificationService: NotificationComponentService
  ) {
    const date = dateFactory(2022, 8, 20);

    console.log(date.getDifferenceForHumans());
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
    this.notificationService.launch({
      title: 'Avast antivirus',
      message:
        'The split() method takes a pattern and divides a String into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array.',
      theme: 'danger',
      actions: [
        {
          label: 'Reportar',
          onClick: () => {}
        },
        {
          label: 'Ignorar',
          onClick: () => {}
        }
      ]
    });

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
