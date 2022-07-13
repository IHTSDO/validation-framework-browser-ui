import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'edition'
})
export class EditionPipe implements PipeTransform {

    transform(items: any[]): any[] {
        if (!items) {
            return [];
        }

        items = items.filter(release => release.name.includes('Edition'));

        return items;
    }

}
