import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListFieldElement } from '../list-field-element';

@Component({
  selector: 'xft-list-field-element',
  templateUrl: './list-field-element.component.html',
  styleUrls: ['./list-field-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListFieldElementComponent {
  @Input()
  public element?: ListFieldElement;
}
