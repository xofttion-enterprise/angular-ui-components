export type InputType = 'text' | 'number' | 'password' | 'email';

export interface InputFieldStatus {
  active: boolean;
  error: boolean;
  disabled: boolean;
  msgError?: string;
}
