export interface MonthModel {
  value: number;
  label: string;
}

export function MonthToModel(label: string, value: number): MonthModel {
  return { value, label };
}

export const MonthsList: Array<MonthModel> = [
  MonthToModel('Enero', 0),
  MonthToModel('Febrero', 1),
  MonthToModel('Marzo', 2),
  MonthToModel('Abril', 3),
  MonthToModel('Mayo', 4),
  MonthToModel('Junio', 5),
  MonthToModel('Julio', 6),
  MonthToModel('Agosto', 7),
  MonthToModel('Septiembre', 8),
  MonthToModel('Octubre', 9),
  MonthToModel('Noviembre', 10),
  MonthToModel('Diciembre', 11)
];
