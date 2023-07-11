import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'alphabetical'
})
export class AlphabeticalPipe implements PipeTransform {

    transform(items: any[], key): any {
        if (!items) {
            return [];
        }

        items = items.sort(function (a, b) {
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return 1;
            }

            if (a[key].toLowerCase() < b[key].toLowerCase()) {
                return -1;
            }

            return null;
        });

        return items;
    }
}
