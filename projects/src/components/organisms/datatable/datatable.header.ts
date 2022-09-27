import { ActionDatatable } from '../../utils';

export interface DatatableHeader {
  title: string;
  subtitle?: string;
  actions?: ActionDatatable[];
}
