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
                if (item.groups) {
                    return inputFilters.find(element => {
                        return item.groups.includes(element);
                    });
                }

                return [];
            });
        } else {
            items = items.filter(item => {
                if (item.groups) {
                    return inputFilters.every(element => {
                        return item.groups.includes(element);
                    });
                }

                return [];
            });
        }


        return items;
    }

}
