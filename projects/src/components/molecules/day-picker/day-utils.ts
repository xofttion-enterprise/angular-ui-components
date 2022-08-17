import { getDaysMonth } from '@xofttion-enterprise/utils';

export interface DayPickerStatus {
  disabled: boolean;
}

interface DayModelStatus {
  forbidden: boolean;
  disabled: boolean;
}

export interface DayModel {
  value?: number;
  status: DayModelStatus;
}

export interface WeekModel {
  days: Array<DayModel>;
}

export function DayToModel(
  value?: number,
  disabled = false,
  forbidden = false
): DayModel {
  return {
    value,
    status: {
      disabled,
      forbidden
    }
  };
}

export class DateFactory {
  public static build(year?: number, month?: number, day?: number): Date {
    const date = new Date();

    if (!isNaN(year as number)) {
      this._resetDayYear(date, year as number);

      date.setFullYear(year as number);
    }

    if (!isNaN(month as number)) {
      this._resetDayMonth(date, month as number);

      date.setMonth(month as number);
    }

    if (!isNaN(day as number)) {
      date.setDate(day as number);
    }

    return date;
  }

  public static setYear(oldDate: Date, year: number): Date {
    const date = new Date(oldDate.getTime());

    this._resetDayYear(date, year);

    date.setFullYear(year);

    return date;
  }

  private static _resetDayYear(date: Date, year: number): void {
    const days = getDaysMonth(year, date.getMonth());

    if (days < date.getDate()) {
      date.setDate(days);
    }
  }

  public static setMonth(oldDate: Date, month: number): Date {
    const date = new Date(oldDate.getTime());

    this._resetDayMonth(date, month);

    date.setMonth(month);

    return date;
  }

  private static _resetDayMonth(date: Date, month: number): void {
    const days = getDaysMonth(date.getFullYear(), month);

    if (days < date.getDate()) {
      date.setDate(days);
    }
  }

  public static setDay(oldDate: Date, day: number): Date {
    const date = new Date(oldDate.getTime());

    date.setDate(day);

    return date;
  }
}
