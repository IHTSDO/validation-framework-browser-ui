import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'authoring'
})
export class AuthoringPipe implements PipeTransform {

    transform(items: any[]): any[] {
        if (!items) {
            return [];
        }

        items = items.filter(release => release.name.includes('-authoring'));

        return items;
    }

}
