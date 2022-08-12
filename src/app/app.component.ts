import { Component, ViewEncapsulation } from '@angular/core';
import { Optional } from '@xofttion-enterprise/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {
    const o = Optional.of('Daniel Castillo Uchiha');

    console.log(o.get());
  }
}
