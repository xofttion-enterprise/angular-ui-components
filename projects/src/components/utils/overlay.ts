import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';

export interface OverlayEvent {
  key: string;
  value?: any;
}

type OverlayListener = (_: OverlayEvent) => void;

export class OverlayElement<E> {
  private _componentRef: ComponentRef<E>;

  constructor(
    private _overlayRef: OverlayRef,
    private _portal: ComponentPortal<E>
  ) {
    this._componentRef = this._overlayRef.attach(this._portal);
  }

  public get overlayRef(): OverlayRef {
    return this._overlayRef;
  }

  public get portal(): ComponentPortal<E> {
    return this._portal;
  }

  public get componentRef(): ComponentRef<E> {
    return this._componentRef;
  }

  public get instace(): E {
    return this._componentRef.instance;
  }

  public get nativeElement(): Element {
    return this._componentRef.location.nativeElement;
  }

  public destroy(): void {
    this._componentRef.destroy();
    this._overlayRef.dispose();
  }
}

export class OverlayComponent<C, E> {
  private _parent: C;

  private _child: E;

  private _listeners: Array<OverlayListener> = [];

  constructor(
    private _overlayParent: OverlayElement<C>,
    private _overlayChild: OverlayElement<E>
  ) {
    this._parent = this._overlayParent.componentRef.instance;
    this._child = this._overlayChild.componentRef.instance;
  }

  public get overlayParent(): OverlayElement<C> {
    return this._overlayParent;
  }

  public get overlayChildren(): OverlayElement<E> {
    return this._overlayChild;
  }

  public get parent(): C {
    return this._parent;
  }

  public get child(): E {
    return this._child;
  }

  public addListener(listener: OverlayListener): void {
    this._listeners.push(listener);
  }

  public emit(event: OverlayEvent): void {
    this._listeners.forEach((listener) => listener(event));
  }

  public destroy(): void {
    this._overlayParent.destroy();
    this._overlayChild.destroy();
  }
}

export interface OnOverlay<C, E> {
  ngOnOverlay(overlay: OverlayComponent<C, E>): void;
}

export class OverlayService {
  constructor(protected _overlay: Overlay) {}

  protected _getElement<E>(component: ComponentType<E>): OverlayElement<E> {
    return OverlayElementFactory(this._overlay, component);
  }
}

export function OverlayElementFactory<E>(
  overlay: Overlay,
  component: ComponentType<E>
): OverlayElement<E> {
  return new OverlayElement(overlay.create(), new ComponentPortal(component));
}
