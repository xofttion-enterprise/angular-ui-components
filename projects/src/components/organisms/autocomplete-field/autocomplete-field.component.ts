import {
  Component,
  forwardRef,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListFieldElement } from '../list-field/list-field-element';
import { ListFieldComponent } from '../list-field/list-field.component';

interface StoreCoincidence {
  pattern: string;
  value?: Array<ListFieldElement>;
  before: StoreCoincidence | null;
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

  private _store: StoreCoincidence = {
    pattern: '',
    value: [],
    before: null
  };

  private _coindicence = '';

  public coincidences: Array<ListFieldElement> = [];

  public get isSelected(): boolean {
    return !!this.value;
  }

  public override onFocus(): void {
    super.onFocus();

    this.suggestion = this._coindicence;

    this._searchSuggestions(this.suggestion);

    this.showSuggestions();
  }

  public override onBlur(): void {
    super.onBlur();

    if (this.value) {
      this.suggestion = this.value.description || '';
    }
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

  public onClickAction() {
    this._coindicence = '';

    this.setValue();

    this.onChange();
    this.onTouch();

    this.focusInput();
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

    this.setValue(element);

    this.onChange(element);
    this.onTouch(element);

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
        pattern: value,
        before: store || null
      };
    } else {
      this.coincidences = this.suggestions.slice(0, 6);

      this._rebootStore();
    }
  }

  private _searchInStore(value: string): StoreCoincidence | null {
    if (this._store.pattern) {
      let coincidences: StoreCoincidence = this._store;
      let isSearch = false;

      while (!isSearch) {
        isSearch = like(value, coincidences.pattern, true);

        if (!isSearch) {
          coincidences = coincidences.before as StoreCoincidence;
          isSearch = coincidences === undefined;
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

function like(value: string, pattern: string, force = false): boolean {
  if (pattern) {
    let filter = pattern.toLowerCase();
    let test = value.toLowerCase();

    if (force) {
      test = normalize(test);
      filter = normalize(filter);
    }

    return !!test.match(`^.*${filter}.*$`);
  }

  return !!value;
}

function normalize(value: string): string {
  let result = value;

  result = result.replace('á', 'a');
  result = result.replace('Á', 'A');
  result = result.replace('é', 'e');
  result = result.replace('É', 'E');
  result = result.replace('í', 'i');
  result = result.replace('Í', 'I');
  result = result.replace('ó', 'o');
  result = result.replace('Ó', 'O');
  result = result.replace('ú', 'u');
  result = result.replace('Ú', 'U');

  return result;
}
