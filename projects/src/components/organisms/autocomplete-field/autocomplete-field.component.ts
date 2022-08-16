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
  oldValue?: StoreCoincidence;
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

  private _storeCoincidences: StoreCoincidence = {
    pattern: '',
    value: [],
    oldValue: undefined
  };

  private _valueCoindicence = '';

  public coincidences: Array<ListFieldElement> = [];

  public get isSelected(): boolean {
    return !!this.value;
  }

  public onClickValue(): void {
    this.focusInput();
  }

  public override onFocus(): void {
    super.onFocus();

    this.suggestion = this._valueCoindicence;

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
    this._valueCoindicence = '';

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

    this._storeCoincidences = {
      pattern: this._valueCoindicence,
      value: this.coincidences
    };
  }

  public onInput(event: Event): void {
    const inputTarget = event.target as HTMLInputElement;

    this._valueCoindicence = inputTarget.value;
    this.suggestion = inputTarget.value;

    this._searchSuggestions(inputTarget.value);
  }

  private _searchSuggestions(value: string | null): void {
    if (value) {
      const storeCoincidences = this._searchStoreCoincidences(value);

      let suggestions = this.suggestions;

      if (storeCoincidences?.value) {
        suggestions = storeCoincidences.value;
      }

      const coincidences = suggestions.filter((element) =>
        element.isCoincidence(value)
      );

      this.coincidences = coincidences.slice(0, 6);

      this._storeCoincidences = {
        value: coincidences,
        pattern: value,
        oldValue: storeCoincidences || undefined
      };
    } else {
      this.coincidences = this.suggestions.slice(0, 6);

      this._rebootStoreCoincidences();
    }
  }

  private _searchStoreCoincidences(value: string): StoreCoincidence | null {
    if (this._storeCoincidences.pattern) {
      let coincidences: StoreCoincidence = this._storeCoincidences;
      let stopSearch = false;

      while (!stopSearch) {
        stopSearch = like(value, coincidences.pattern, true);

        if (!stopSearch) {
          coincidences = coincidences.oldValue as StoreCoincidence;
          stopSearch = coincidences === undefined;
        }
      }

      return coincidences ? coincidences : this._rebootStoreCoincidences();
    }

    return null;
  }

  private _rebootStoreCoincidences(): StoreCoincidence {
    return (this._storeCoincidences = {
      pattern: '',
      value: undefined,
      oldValue: undefined
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
