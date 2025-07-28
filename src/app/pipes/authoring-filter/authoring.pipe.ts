import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'authoring' })
export class AuthoringPipe implements PipeTransform {

    transform(items: any[]): any[] {
        if (!items) {
            return [];
        }

        items = items.filter(release => {
            if (release.name) {
                return release.name.includes('-authoring');
            } else {
                return release.includes('-authoring');
            }
        });

        items = items.filter(release => {
            if (release.name) {
                return !release.name.includes('-authoring-without-lang-refsets');
            } else {
                return !release.includes('-authoring-without-lang-refsets');
            }
        });

        return items;
    }

}
