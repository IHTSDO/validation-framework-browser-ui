import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'exceptionsTable'
})
export class ExceptionsTablePipe implements PipeTransform {

    transform(items: any[], exceptionId: string): any[] {
        if (!items) {
            return [];
        }

        items = items.filter(item => item.validationRuleId === exceptionId);

        return items;
    }
}
