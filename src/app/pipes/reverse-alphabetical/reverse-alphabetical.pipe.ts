import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverseAlphabetical'
})
export class ReverseAlphabeticalPipe implements PipeTransform {

    transform(items: any[], key: string): any {
        if (!items) {
            return [];
        }

        return items.sort((a,b) => b[key] - a[key]);
    }
}
