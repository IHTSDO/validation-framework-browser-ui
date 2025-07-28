import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'exceptions' })
export class ExceptionsPipe implements PipeTransform {

    transform(items: any[], exceptions: any, exceptionsReturnOverride: boolean): any[] {
        if (!items) {
            return [];
        }

        if (!exceptions && exceptionsReturnOverride) {
            return [];
        }

        if (exceptions) {
            items = items.filter(item => {
                return exceptions.some(exception => exception.validationRuleId === item.uuid);
            });
        }

        return items;
    }
}
