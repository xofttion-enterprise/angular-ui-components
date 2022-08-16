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
    const days = DateUtils.getDaysMonth(year, date.getMonth());

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
    const days = DateUtils.getDaysMonth(date.getFullYear(), month);

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

export class DateUtils {
  public static weight(date: Date): number {
    return (
      date.getFullYear() * 365 + (date.getMonth() + 1) * 30 + date.getDate()
    );
  }

  public static format(date: Date, format?: string): string {
    format = format || 'DD-MM-AA HH:II:SS';

    format = format.replace('DD', this._completNumber(date.getDate(), 2));

    format = format.replace('DW', DateParams.days.week[date.getDay()]);

    format = format.replace('DX', DateParams.days.weekmin[date.getDay()]);

    format = format.replace('MM', this._completNumber(date.getMonth() + 1, 2));

    format = format.replace('MN', DateParams.months.year[date.getMonth()]);

    format = format.replace('MX', DateParams.months.yearmin[date.getMonth()]);

    format = format.replace('AA', this._completNumber(date.getFullYear(), 4));

    format = format.replace('HH', date.getHours().toString().padStart(2, '0'));

    format = format.replace('II', this._completNumber(date.getMinutes(), 2));

    format = format.replace('SS', this._completNumber(date.getSeconds(), 2));

    format = format.replace('HZ', this._completNumber(this._getHour(date), 2));

    format = format.replace('ZZ', date.getHours() > 11 ? 'PM' : 'AM');

    return format;
  }

  private static _completNumber(value: number, size: number): string {
    return value.toString().padStart(size, '0');
  }

  private static _getHour(date: Date): number {
    if (date.getHours() > 12) {
      return date.getHours() - 12;
    }

    if (date.getHours() === 0) {
      return 12;
    }

    return date.getHours();
  }

  public static getDaysMonth(year: number, month: number): number {
    let days = DateParams.days.months[month];

    if (month === 1 && DateUtils.isLeapYear(year)) {
      days++;
    }

    return days;
  }

  public static isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
}

export const DateParams = {
  months: {
    year: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    yearmin: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ]
  },
  days: {
    months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    week: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    weekmin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
  }
};
