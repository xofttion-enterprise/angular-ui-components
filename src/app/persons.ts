import { ListFieldElement } from 'projects/src/components/organisms/list-field/list-field-element';

class Person implements ListFieldElement {
  initials = '10%';
  subtitle?: string;
  title: string;

  constructor(title: string, subtitle: string) {
    this.title = title;
    this.subtitle = subtitle;
  }

  public get description(): string {
    return this.title;
  }
}

const p1 = new Person('Daniel Andrés Castillo Pedroza', 'ADL Digital Labs');
const p2 = new Person('Adrian Rafael Castillo Pedroza', 'Ceiba S.A.S.');
const p3 = new Person(
  'Fabian Castillo Pedroza',
  'Universidad Popular del Cesar'
);

export const persons = [p1, p3, p2];
