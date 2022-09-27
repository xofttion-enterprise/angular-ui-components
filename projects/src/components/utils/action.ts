export interface ActionElement {
  label?: string;
  icon?: string;
  data?: unknown;
  onClick?: () => void;
  hidden?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
}

export interface ActionIcon extends ActionElement {
  icon: string;
}

export interface ActionDatatable extends ActionIcon {
  progressType?: boolean;
  progress?: boolean | (() => boolean);
}

export function isActionDisabled(action: ActionElement): boolean {
  return action.disabled
    ? typeof action.disabled === 'function'
      ? action.disabled()
      : action.disabled
    : false;
}

export function isActionHidden(action: ActionElement): boolean {
  return action.hidden
    ? typeof action.hidden === 'function'
      ? action.hidden()
      : action.hidden
    : false;
}

export function isActionProgress(action: ActionDatatable): boolean {
  return action.progress
    ? typeof action.progress === 'function'
      ? action.progress()
      : action.progress
    : false;
}
