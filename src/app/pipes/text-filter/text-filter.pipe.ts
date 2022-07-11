import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'textFilter',
    pure: false
})
export class TextFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        let splitArray = searchText.split(' ');
        splitArray = splitArray.filter(item => item !== '');

        const response = [];

        items.forEach(item => {
            splitArray.forEach(split => {
                if (item.uuid.toLowerCase().includes(split) && !response.includes(item)) {
                    response.push(item);
                }
            });
        });

        items.forEach(item => {
            splitArray.forEach(split => {
                if (item.assertionText.toLowerCase().includes(split) && !response.includes(item)) {
                    response.push(item);
                }
            });
        });

        return response;
    }

}
