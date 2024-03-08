import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'groupFilter',
    pure: false
})
export class GroupFilterPipe implements PipeTransform {

    transform(items: any[], inputFilters: string[], additive: boolean): any[] {
        if (!items) {
            return [];
        }
        if (!inputFilters?.length) {
            return items;
        }

        if (additive) {
            items = items.filter(item => {
                return inputFilters.find(element => {
                    if (item.groups?.includes(element)) {
                        return item;
                    }
                });
            });
        } else {
            items = items.filter(item => {
                return inputFilters.every(element => {
                    if (item.groups?.includes(element)) {
                        return item;
                    }
                });
            });
        }

        return items;
    }
}
