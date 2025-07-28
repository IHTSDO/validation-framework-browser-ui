import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'edition' })
export class EditionPipe implements PipeTransform {

    transform(items: any[]): any[] {
        if (!items) {
            return [];
        }

        items = items.filter(release => {
            if (release.name) {
                return release.name.includes('Edition')
            } else {
                return release.includes('Edition');
            }
        });

        return items;
    }

}
