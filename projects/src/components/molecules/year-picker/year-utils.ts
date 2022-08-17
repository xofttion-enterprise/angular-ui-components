interface YearModelStatus {
  disabled: boolean;
  selected: boolean;
}

export interface YearModel {
  value?: number;
  status: YearModelStatus;
}

export function YearToModel(
  value?: number,
  disabled?: boolean,
  selected?: boolean
): YearModel {
  return {
    value,
    status: {
      disabled: disabled || false,
      selected: selected || false
    }
  };
}
