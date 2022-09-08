import { ListFieldElement } from 'projects/src/components/organisms/list-field/list-field-element';

class Person implements ListFieldElement {
  initials = '10%';
  subtitle?: string;
  title: string;
  photo?: string;
  value = 'Daniel';

  constructor(title: string, subtitle: string, photo?: string) {
    this.title = title;
    this.subtitle = subtitle;

    if (photo) {
      this.initials = '';
      this.photo = photo;
    }
  }

  public get description(): string {
    return this.title;
  }

  public hasCoincidence(value: string): boolean {
    return this.title.includes(value);
  }
}

const p1 = new Person('Daniel Andrés Castillo Pedroza', 'ADL Digital Labs');
const p2 = new Person('Adrian Rafael Castillo Pedroza', 'Ceiba S.A.S.');
const p3 = new Person(
  'Fabian Castillo Pedroza',
  'Universidad Popular del Cesar'
);
const p4 = new Person(
  'Cristiano Ronaldo Aveiro',
  'Real Madrid C.F.',
  'assets/cr7.jpg'
);
const p5 = new Person('Katherin Bolaño Narvaez', 'Clinica Alta Complejidad');

export const persons = [p1, p3, p2, p4, p5];
