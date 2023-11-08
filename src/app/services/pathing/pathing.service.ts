import {Injectable} from '@angular/core';
import {map, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Codesystem} from "../../models/codesystem";
import {Version} from "../../models/version";

@Injectable({
    providedIn: 'root'
})
export class PathingService {

    private codesystems = new Subject<Codesystem[]>();
    private activeCodesystem = new Subject<Codesystem>();
    private versions = new Subject<Version[]>();
    private activeVersion = new Subject<Version>();

    constructor(private http: HttpClient) {
    }

    setActiveCodesystem(codesystem: Codesystem): void {
        this.activeCodesystem.next(codesystem);
    }

    getActiveCodesystem(): Observable<Codesystem> {
        return this.activeCodesystem.asObservable();
    }

    setCodesystems(codesystems: Codesystem[]): void {
        this.codesystems.next(codesystems);
    }

    getCodesystems(): Observable<Codesystem[]> {
        return this.codesystems.asObservable();
    }

    httpGetCodesystems(): Observable<Codesystem[]> {
        return this.http.get('/snowstorm/snomed-ct/codesystems').pipe(map((data: any) => {
                return data.items;
            }
        ));
    }

    setActiveVersion(version: Version): void {
        this.activeVersion.next(version);
    }

    getActiveVersion(): Observable<Version> {
        return this.activeVersion.asObservable();
    }

    setVersions(versions: Version[]): void {
        this.versions.next(versions);
    }

    getVersions(): Observable<Version[]> {
        return this.versions.asObservable();
    }

    httpGetVersions(activeCodesystem: Codesystem): Observable<Version[]> {
        return this.http.get('/snowstorm/snomed-ct/codesystems/' + activeCodesystem.shortName + '/versions').pipe(map((data: any) => {
                return data.items;
            }
        ));
    }
}
