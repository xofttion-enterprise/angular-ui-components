import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { Queque } from '@xofttion-enterprise/utils';
import {
  ComponentDOM,
  getDurationMessenger,
  MESSENGER_DURATION_RESET,
  setThemeDOM
} from '../../utils';

export interface NotificationConfig {
  avatar?: string;
  title?: string;
  message: string;
  actions?: Array<NotificationAction>;
  theme?: string;
}

interface NotificationAction {
  autoclose?: boolean;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

@Component({
  selector: 'xft-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnDestroy {
  private _componentDOM: ComponentDOM;

  private _queque: Queque<NotificationConfig>;

  private _timeoutId?: any;

  private _visible = false;

  public config: NotificationConfig;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.config = { message: '' };

    this._queque = new Queque<NotificationConfig>();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-notification');
  }

  public ngOnDestroy(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  public get visible(): boolean {
    return this._visible;
  }

  public launch(config: NotificationConfig): void {
    if (!this._visible) {
      const duration = getDurationMessenger(config.message);

      this.config.theme = setThemeDOM(
        this._componentDOM,
        config.theme || 'xofttion',
        this.config.theme
      );

      this.config = config;

      this._show();

      this._timeoutId = setTimeout(() => this._hide(), duration);
    } else {
      this._queque.enqueue(config);
    }
  }

  public onClickAction(action: NotificationAction): void {
    action.onClick();

    if (action.autoclose) {
      this._hideForce();
    }
  }

  private _show(): void {
    this._componentDOM.addClass('xft-notification--show');
    this._visible = true;
  }

  private _hide(): void {
    this._componentDOM.removeClass('xft-notification--show');
    this._visible = false;

    const config = this._queque.dequeue();

    if (config.isPresent()) {
      setTimeout(() => this.launch(config.get()), MESSENGER_DURATION_RESET);
    }
  }

  private _hideForce(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    this._timeoutId = undefined;
    this._hide();
  }
}
