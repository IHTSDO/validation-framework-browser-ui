import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    private severity = new Subject();
    private group = new Subject();
    private type = new Subject();

    constructor() {
    }

    setSeverity(severity) {
        this.severity.next(severity);
    }

    getSeverity() {
        return this.severity.asObservable();
    }

    setGroup(group) {
        this.group.next(group);
    }

    getGroup() {
        return this.group.asObservable();
    }

    setType(type) {
        this.type.next(type);
    }

    getType() {
        return this.type.asObservable();
    }
}
