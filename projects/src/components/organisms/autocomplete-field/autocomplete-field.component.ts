import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { like } from '@xofttion-enterprise/utils';
import { ListFieldElement } from '../list-field/list-field-element';
import { ListFieldComponent } from '../list-field/list-field.component';

type StoreCoincidenceNulleable = StoreCoincidence | null;

interface StoreCoincidence {
  pattern: string;
  value?: Array<ListFieldElement>;
  before: StoreCoincidenceNulleable;
}

@Component({
  selector: 'xft-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: [
    '../list-field/list-field.component.scss',
    './autocomplete-field.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteFieldComponent),
      multi: true
    }
  ]
})
export class AutocompleteFieldComponent extends ListFieldComponent {
  @HostListener('document:click', ['$event.target'])
  public onClickDocument(element: HTMLElement) {
    if (!this._ref.nativeElement?.contains(element)) {
      this.hideSuggestions();
    }
  }

  @Input()
  public requestAllow = false;

  @Input()
  public requesting = false;

  @Output()
  public request = new EventEmitter<string>();

  private _store: StoreCoincidence = {
    pattern: '',
    value: [],
    before: null
  };

  private _coindicence = '';

  public description = '';

  public coincidences: Array<ListFieldElement> = [];

  public get isSelected(): boolean {
    return !!this.value;
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes['suggestions']) {
      this._rebootStore();
      this._searchSuggestions(this.suggestion);
    }
  }

  public onOpen(): void {
    this.onFocus();

    setTimeout(() => this._inputElement?.focus(), 240);
  }

  public override onFocus(): void {
    super.onFocus();

    this.suggestion = this._coindicence;

    this._searchSuggestions(this.suggestion);

    this.showSuggestions();
  }

  public override onBlur(): void {
    super.onBlur();
  }

  public onKeydownInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Escape':
        this.hideSuggestions();
        break;

      case 'Tab':
        this.hideSuggestions();
        break;

      default:
        this.navigationInput(event);
        break;
    }
  }

  public onKeydownElement(
    event: KeyboardEvent,
    element: ListFieldElement
  ): void {
    switch (event.code) {
      case 'Enter':
        this.onSelect(element);
        break;

      default:
        this.navigationElement(event);
        break;
    }
  }

  public onSelect(element: ListFieldElement): void {
    this.hideSuggestions();

    this.description = element.description;

    this.setDefineValue(element);

    this._store = {
      pattern: this._coindicence,
      value: this.coincidences,
      before: null
    };
  }

  public onInput(event: Event): void {
    const inputTarget = event.target as HTMLInputElement;

    this._coindicence = inputTarget.value;
    this.suggestion = inputTarget.value;

    this._searchSuggestions(inputTarget.value);
  }

  public onClear(): void {
    this._coindicence = '';
    this.description = '';

    this.setValue();

    this.onChange();
    this.onTouch();

    this.focusInput();
  }

  public onRequest(): void {
    this.request.emit(this.suggestion);
  }

  protected override navigationInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowDown':
        this._navigationInputDown();
        break;
    }
  }

  private _searchSuggestions(value: string | null): void {
    if (value) {
      const store = this._searchInStore(value);

      let suggestions = this.suggestions;

      if (store?.value) {
        suggestions = store.value;
      }

      const coincidences = suggestions.filter((element) =>
        element.hasCoincidence(value)
      );

      this.coincidences = coincidences.slice(0, 6);

      this._store = {
        value: coincidences,
        before: store,
        pattern: value
      };
    } else {
      this.coincidences = this.suggestions.slice(0, 6);

      this._rebootStore();
    }
  }

  private _searchInStore(value: string): StoreCoincidence | null {
    if (this._store.pattern) {
      let coincidences: StoreCoincidenceNulleable = this._store;
      let isSearch = false;

      while (!isSearch && coincidences) {
        isSearch = like(value, coincidences.pattern, true);

        if (!isSearch) {
          coincidences = coincidences.before;
        }
      }

      return coincidences ? coincidences : this._rebootStore();
    }

    return null;
  }

  private _rebootStore(): StoreCoincidence {
    return (this._store = {
      pattern: '',
      value: undefined,
      before: undefined || null
    });
  }
}
