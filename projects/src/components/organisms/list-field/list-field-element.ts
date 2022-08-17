export interface ListFieldElement {
  description?: string;
  initials?: string;
  photo?: string;
  subtitle?: string;
  title: string;

  isCoincidence(value: string): boolean;
}
