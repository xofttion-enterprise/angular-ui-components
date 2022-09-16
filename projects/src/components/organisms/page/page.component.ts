import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ScrollerManager } from '@xofttion-enterprise/utils';
import { ComponentDOM } from '../../utils';

@Component({
  selector: 'xft-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private _componentDOM: ComponentDOM;

  private _scroller!: ScrollerManager;

  private _isScrollTopStart = true;

  private _isScrollTopEnd = false;

  constructor(
    private _ref: ElementRef,
    private _renderer: Renderer2,
    private _cdRef: ChangeDetectorRef
  ) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-page');

    const content = this._componentDOM.querySelector('.xft-page__content');

    if (content.isPresent()) {
      this._scroller = new ScrollerManager(content.get() as HTMLElement);
    }
  }

  public ngAfterViewInit(): void {
    this._isScrollTopStart = this._scroller?.isScrollTopMin;
    this._isScrollTopEnd = this._scroller?.isScrollTopMax;
  }

  public ngAfterViewChecked(): void {
    this._cdRef.detectChanges();
  }

  public get isScrollTopStart(): boolean {
    return this._isScrollTopStart;
  }

  public get isScrollTopEnd(): boolean {
    return this._isScrollTopEnd;
  }

  public onScroll(): void {
    this._isScrollTopStart = this._scroller.isScrollTopMin;
    this._isScrollTopEnd = this._scroller.isScrollTopMax;
  }
}
