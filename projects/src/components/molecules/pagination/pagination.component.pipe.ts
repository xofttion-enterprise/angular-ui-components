import { Pipe, PipeTransform } from '@angular/core';
import { like } from '@xofttion-enterprise/utils';

@Pipe({
  name: 'paginationPipe'
})
export class PaginationComponentPipe implements PipeTransform {
  public transform(suggestions: Array<any>, filter: string) {
    if (filter) {
      return suggestions.filter((suggestion) => {
        return like(JSON.stringify(suggestion), filter, true);
      });
    }

    return suggestions;
  }
}
