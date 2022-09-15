export interface ListFieldElement {
  description: string;
  initials?: string;
  photo?: string;
  subtitle?: string;
  title: string;
  value: any;

  compareTo(value: unknown): boolean;

  hasCoincidence(pattern: string): boolean;
}
