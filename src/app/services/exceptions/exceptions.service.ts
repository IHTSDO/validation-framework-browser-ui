import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PathingService} from "../pathing/pathing.service";
import {Codesystem} from "../../models/codesystem";
import {Version} from "../../models/version";

@Injectable({
    providedIn: 'root'
})
export class ExceptionsService {

    activeCodesystem: Codesystem;
    activeCodesystemSubscription: Subscription;
    activeVersion: Version;
    activeVersionSubscription: Subscription;

    private exceptions = new Subject();
    private exceptionsLoadingOverride = new BehaviorSubject<boolean>(true);

    constructor(private http: HttpClient,
                private pathingService: PathingService) {
        this.activeCodesystemSubscription = this.pathingService.getActiveCodesystem().subscribe(data => this.activeCodesystem = data);
        this.activeVersionSubscription = this.pathingService.getActiveVersion().subscribe(data => this.activeVersion = data);
    }

    setExceptionsLoadingOverride(exceptionsLoadingOverride) {
        this.exceptionsLoadingOverride.next(exceptionsLoadingOverride);
    }

    getExceptionsLoadingOverride() {
        return this.exceptionsLoadingOverride.asObservable();
    }

    setExceptions(exceptions) {
        this.exceptions.next(exceptions);
    }

    getExceptions() {
        return this.exceptions.asObservable();
    }

    httpGetExceptions(): Observable<any> {
        return this.http.get('/authoring-acceptance-gateway/whitelist-items/' + this.activeCodesystem.branchPath + (this.activeVersion ? '/' + this.activeVersion.version : '') + '?includeDescendants=true&type=ALL&size=10000');
    }
}
