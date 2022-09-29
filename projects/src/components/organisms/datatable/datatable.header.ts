import { ActionDatatable } from '../../utils';

export interface DatatableHeader {
  title: string;
  subtitle?: string | (() => string);
  actions?: ActionDatatable[];
}
