import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { LottiePlayer } from '@lottiefiles/lottie-player';
import { ComponentDOM } from '../../utils';

export type LottieStatus = 'play' | 'pause' | 'stop';

@Component({
  selector: 'xft-lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LottieComponent implements OnInit, OnChanges {
  @Input()
  public src?: string;

  @Input()
  public status: LottieStatus = 'play';

  @Input()
  public loop = false;

  @Input()
  public speed = 1;

  private _componentDOM: ComponentDOM;

  private _lottie!: LottiePlayer;

  private _start = false;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-lottie');

    this._lottie = this._ref.nativeElement.querySelector('lottie-player');

    this._lottie.addEventListener('rendered', () => {
      this._start = true;

      if (this.loop) {
        this._lottie.setAttribute('loop', '');
      }

      if (this.src) {
        this._loadSrc(this.src);
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeSrc(changes);
    this._changeStatus(changes);
    this._changeLoop(changes);
  }

  private _loadSrc(src: string): void {
    this._lottie.load(src);

    if (this.status === 'play') {
      this._lottie.play();
    }
  }

  private _changeSrc(changes: SimpleChanges) {
    if (changes['src'] && changes['src'].currentValue && this._start) {
      this._loadSrc(changes['src'].currentValue);
    }
  }

  private _changeStatus(changes: SimpleChanges) {
    if (changes['status'] && this._start) {
      const status = changes['status'].currentValue as LottieStatus;

      switch (status) {
        case 'play':
          this._lottie.play();
          break;
        case 'pause':
          this._lottie.pause();
          break;
        case 'stop':
          this._lottie.stop();
          break;
      }
    }
  }

  private _changeLoop(changes: SimpleChanges) {
    if (changes['loop'] && this._start) {
      changes['loop'].currentValue
        ? this._lottie.setAttribute('loop', '')
        : this._lottie.removeAttribute('loop');
    }
  }
}
