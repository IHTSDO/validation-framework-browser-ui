import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'groupFilter',
    pure: false
})
export class GroupFilterPipe implements PipeTransform {

    transform(items: any[], inputFilters: string[]): any[] {
        if (!items) {
            return [];
        }
        if (!inputFilters?.length) {
            return items;
        }

        items = items.filter(item => {
            if (item.groups) {
                return inputFilters.every(element => {
                    return item.groups.includes(element);
                });
            }
        });

        return items;
    }

}
