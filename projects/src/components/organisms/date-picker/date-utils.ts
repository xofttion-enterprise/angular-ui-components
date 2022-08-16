export type DatePickerListenerName = 'DateSelect' | 'DateToday' | 'DateCancel';

export interface DatePickerListener {
  name: DatePickerListenerName;
  value?: Date;
}
