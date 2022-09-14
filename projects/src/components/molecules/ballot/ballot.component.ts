import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { IsDefined } from '@xofttion-enterprise/utils';
import { ComponentDOM } from '../../utils';

@Component({
  selector: 'xft-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BallotComponent implements OnInit {
  @Input()
  public initials?: string;

  @Input()
  public photo?: string;

  @Input()
  public subtitle?: string;

  @Input()
  public bordered = false;

  @Input()
  public skeleton = false;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-ballot');
  }

  public get hasAvatar(): boolean {
    return IsDefined(this.initials) || IsDefined(this.photo);
  }
}
