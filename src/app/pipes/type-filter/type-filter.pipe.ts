import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'typeFilter',
    pure: false
})
export class TypeFilterPipe implements PipeTransform {

    transform(items: any[], type: string): any[] {
        if (!items) {
            return [];
        }
        if (!type) {
            return items;
        }

        type = type.toLowerCase();

        items = items.filter(item => {
            if (item.type) {
                return item.type.toLowerCase().includes(type);
            }
        });

        return items;
    }

}
