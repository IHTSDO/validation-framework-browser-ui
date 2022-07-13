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
            let valid = true;

            for (let split of splitArray) {
                if (!item.uuid.toLowerCase().includes(split.toLowerCase())) {
                    valid = false;
                    break;
                }
            }

            if (valid && !response.includes(item)) {
                response.push(item);
            }
        });

        items.forEach(item => {
            let valid = true;

            for (let split of splitArray) {
                if (!item.assertionText.toLowerCase().includes(split.toLowerCase())) {
                    valid = false;
                    break;
                }
            }

            if (valid && !response.includes(item)) {
                response.push(item);
            }
        });

        return response;
    }

}
