import { ElementRef, Renderer2 } from '@angular/core';
import { Optional } from '@xofttion-enterprise/utils';

export class ComponentDOM {
  private constructor(private _ref: ElementRef, private _renderer: Renderer2) {}

  public get element(): HTMLElement {
    return this._ref.nativeElement;
  }

  public addClass(className: string): void {
    this._renderer.addClass(this.element, className);
  }

  public removeClass(className: string): void {
    this._renderer.removeClass(this.element, className);
  }

  public toggleClass(className: string, status: boolean): void {
    status ? this.addClass(className) : this.removeClass(className);
  }

  public querySelector(selector: string): Optional<Element> {
    return Optional.build(this.element.querySelector(selector));
  }

  public querySelectorAll(selector: string): NodeListOf<HTMLElement> {
    return this.element.querySelectorAll(selector);
  }

  public setProperty(name: string, value: string): void {
    this._renderer.setProperty(this.element, name, value);
  }

  public setAttribute(name: string, value: string): void {
    this._renderer.setAttribute(this.element, name, value);
  }

  public static build(ref: ElementRef, renderer: Renderer2): ComponentDOM {
    return new ComponentDOM(ref, renderer);
  }
}
