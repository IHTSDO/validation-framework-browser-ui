import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReleaseService {



    private releases = new Subject();
    private assertions = new Subject();

    constructor(private http: HttpClient) {
    }

    setReleases(releases) {
        this.releases.next(releases);
    }

    getReleases() {
        return this.releases.asObservable();
    }

    httpGetReleases(): Observable<any> {
        return this.http.get('/rvf/groups');
    }

    setAssertions(assertions) {
        this.assertions.next(assertions);
    }

    getAssertions() {
        return this.assertions.asObservable();
    }

    httpGetAssertions(): Observable<any> {
        return this.http.get('/rvf/assertions?includeDroolsRules=true&includeTraceabilityAssertions=true&ignoreResourceType=true');
    }
}
