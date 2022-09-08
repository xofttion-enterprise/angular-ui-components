import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils';
import { PaginationComponentPipe } from './pagination.component.pipe';

export const COUNT_ELEMENT_DEFAULT = 25;
export const FIRST_PAGE = 0;
export const COUNT_PAGE = 1;
export const MAX_PAGE_VISIBLE = 4;

interface PaginationPageStatus {
  active: boolean;
}

export interface PaginationPage {
  label: string;
  value: number;
  status: PaginationPageStatus;
  prev?: PaginationPage;
  next?: PaginationPage;
}

export interface PaginationChanged {
  index: number;
  count: number;
  collection: Array<any>;
  suggestions: Array<any>;
}

@Component({
  selector: 'xft-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  public suggestions: Array<any> = [];

  @Input()
  public count: number = COUNT_ELEMENT_DEFAULT;

  @Input()
  public index = 0;

  @Input()
  public filter = '';

  @Input()
  public label = 'elemento(s)';

  @Output()
  public results: EventEmitter<Array<any>>;

  private _componentDOM: ComponentDOM;

  private _value: Array<any> = [];

  private _collection: Array<any> = [];

  private _pages: Array<PaginationPage> = [];

  private _currentPage?: PaginationPage;

  private _maxPage = 0;

  private _description = '';

  constructor(
    private _ref: ElementRef,
    private _renderer: Renderer2,
    private _paginationPipe: PaginationComponentPipe
  ) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
    this.results = new EventEmitter<Array<any>>();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-pagination');

    this._resetPropsSuggestions(this.suggestions);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeStatusSuggestions(changes);
    this._changeStatusCount(changes);
    this._changeStatusFilter(changes);
  }

  public get value(): Array<any> {
    return this._value;
  }

  public get pages(): Array<PaginationPage> {
    return this._pages;
  }

  public get description(): string {
    return this._description;
  }

  public get isEmpty(): boolean {
    return this.suggestions.length === 0;
  }

  public get isFirstPage(): boolean {
    return this._currentPage?.value === FIRST_PAGE;
  }

  public get isLastPage(): boolean {
    return this._currentPage?.value === this._maxPage - 1;
  }

  public onClickPage(page: PaginationPage): void {
    if (this._currentPage) {
      this._currentPage.status.active = false;
    }

    this._onSelectPage(page);
  }

  public onClickFirst(): void {
    if (this._collection.length) {
      this._resetPropsComponent(this._newIndex(FIRST_PAGE), false, true);
    }
  }

  public onClickPrev(): void {
    if (this._currentPage) {
      if (!this._currentPage.prev) {
        const prevIndex = this._currentPage.value - COUNT_PAGE;

        if (prevIndex >= FIRST_PAGE) {
          this._resetPropsComponent(this._newIndex(prevIndex), false, true);
        }
      } else {
        this._currentPage.status.active = false;

        this._onSelectPage(this._currentPage.prev);
      }
    }
  }

  public onClickNext(): void {
    if (this._currentPage) {
      if (!this._currentPage.next) {
        const nextIndex = this._currentPage.value + 1;

        if (nextIndex <= this._maxPage) {
          this._resetPropsComponent(this._newIndex(nextIndex), false, true);
        }
      } else {
        this._currentPage.status.active = false;

        this._onSelectPage(this._currentPage.next);
      }
    }
  }

  public onClickLast(): void {
    if (this._collection.length) {
      const changed = this._newIndex(this._maxPage - COUNT_PAGE);

      this._resetPropsComponent(changed, false, true);
    }
  }

  private _changeStatusSuggestions(changes: SimpleChanges): void {
    if (changes['suggestions']) {
      this._resetPropsSuggestions(changes['suggestions'].currentValue);
    }
  }

  private _changeStatusCount(changes: SimpleChanges): void {
    if (changes['count']) {
      this._resetPropsCount(changes['count'].currentValue);
    }
  }

  private _changeStatusFilter(changes: SimpleChanges): void {
    if (changes['filter']) {
      this._resetPropsFilter(changes['filter'].currentValue);
    }
  }

  private _resetPropsSuggestions(suggestions: Array<any>): void {
    this.index = FIRST_PAGE;

    if (suggestions.length) {
      this._resetCollection(this.filter);

      const changed = this._newChanged({ suggestions });

      this._resetPropsComponent(changed, true, true);
    } else {
      this._rebootPropsComponent();
    }
  }

  private _resetPropsCount(count: number): void {
    if (count < 0) {
      count = COUNT_ELEMENT_DEFAULT;
    }

    const changed = this._newChanged({ count });

    this._resetPropsComponent(changed, true, true);
  }

  private _resetPropsFilter(filter: string): void {
    const collection = this._resetCollection(filter);

    const changed = this._newChanged({ collection });

    this._resetPropsComponent(changed, true, true);
  }

  private _onSelectPage(page: PaginationPage): void {
    page.status.active = true;
    this._currentPage = page;

    const changed = this._newChanged({ index: page.value });

    this._resetPropsComponent(changed);
  }

  private _resetCollection(filter: string): Array<any> {
    const result = this._paginationPipe.transform(this.suggestions, filter);

    this._collection = result;

    return result;
  }

  private _rebootPropsComponent(): void {
    this._pages = [];
    this._collection = [];
    this._maxPage = 0;

    this._setValue([]);
  }

  private _resetPropsComponent(
    changed: PaginationChanged,
    maxPage = false,
    buildPage = false
  ): void {
    if (maxPage) {
      this._maxPage = this._getMaxPage(changed.collection, changed.count);
    }

    if (buildPage) {
      this._buildPages(changed);
    }

    const newValue = this._getValue(changed);

    this._setValue(newValue);

    this._rebootDescription(changed);
  }

  private _setValue(value: Array<any>): void {
    this._value = value;

    this.results.emit(value);
  }

  private _getValue(changed: PaginationChanged): Array<any> {
    if (changed.collection.length === 0) {
      return [];
    } else {
      const endIndex = (changed.index + COUNT_PAGE) * changed.count;
      const startIndex = changed.index * changed.count;

      return changed.collection.slice(startIndex, endIndex);
    }
  }

  private _rebootDescription(changed: PaginationChanged): void {
    const count = changed.suggestions.length;

    const start = changed.index * changed.count + COUNT_PAGE;
    let end = (changed.index + COUNT_PAGE) * changed.count;

    if (end > changed.collection.length) {
      end = changed.collection.length;
    }

    this._description = `${start} - ${end} de ${count}`;
  }

  private _buildPages(changed: PaginationChanged): void {
    let maxPageVisible = changed.index + MAX_PAGE_VISIBLE;

    if (maxPageVisible > this._maxPage) {
      maxPageVisible = this._maxPage;
    }

    let minIndexPage = maxPageVisible - MAX_PAGE_VISIBLE;

    if (minIndexPage < 0) {
      minIndexPage = 0;
    }

    if (minIndexPage > changed.index) {
      minIndexPage = changed.index;
    }

    this._currentPage = undefined;
    this._pages = [];
    let prevPage = undefined;

    for (let index = minIndexPage; index < maxPageVisible; index++) {
      const newPage = this._getPage(index);

      if (index === changed.index) {
        newPage.status.active = true;

        this._currentPage = newPage;
      }

      this._pages.push(newPage);

      newPage.prev = prevPage;

      if (prevPage) {
        (prevPage as PaginationPage).next = newPage;
      }

      prevPage = newPage;
    }
  }

  private _getPage(value: number): PaginationPage {
    return {
      label: (value + 1).toString(),
      value,
      status: {
        active: false
      }
    };
  }

  private _getMaxPage(collection: Array<any>, count: number): number {
    if (collection.length === 0) {
      return 0;
    }

    const value = collection.length / count;
    let maxPage = parseInt(value.toString());

    if (collection.length % count > 0) {
      maxPage++;
    }

    return maxPage;
  }

  private _newIndex(index: number): PaginationChanged {
    return this._newChanged({ index });
  }

  private _newChanged({
    suggestions,
    index,
    count,
    collection
  }: {
    suggestions?: Array<any>;
    index?: number;
    count?: number;
    collection?: Array<any>;
  }): PaginationChanged {
    return {
      suggestions: suggestions || this.suggestions,
      collection: collection || this._collection,
      index: index || this.index,
      count: count || this.count
    };
  }
}
