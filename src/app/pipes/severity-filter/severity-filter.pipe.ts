import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'severityFilter',
    pure: false
})
export class SeverityFilterPipe implements PipeTransform {

    transform(items: any[], severity: string): any[] {
        if (!items) {
            return [];
        }
        if (!severity) {
            return items;
        }

        severity = severity.toLowerCase();

        items = items.filter(item => {
            if (item.severity) {
                return item.severity.toLowerCase().includes(severity);
            }
        });

        return items;
    }

}
