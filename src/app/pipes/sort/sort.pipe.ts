import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(items: any[], sortKey, sortType): any {
        if (!items) {
            return [];
        }

        if (sortType === 'default') {
            return items;
        }

        if (sortType === 'desc') {
            items = items.sort(function (a, b) {
                if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) {
                    return 1;
                }

                if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) {
                    return -1;
                }
            });
        }

        if (sortType === 'asc') {
            items = items.sort(function (a, b) {
                if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) {
                    return 1;
                }

                if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) {
                    return -1;
                }
            });
        }

        return items;
    }

}
