import {Injectable} from '@angular/core';
import {map, Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BranchingService} from '../branching/branching.service';
import {AuthoringService} from '../authoring/authoring.service';
import {Codesystem} from "../../models/codesystem";
import {Version} from "../../models/version";
import {PathingService} from "../pathing/pathing.service";

@Injectable({
    providedIn: 'root'
})
export class ConceptService {

    private branchPath: string;
    private branchPathSubscription: Subscription;

    activeCodesystem: Codesystem;
    activeCodesystemSubscription: Subscription;
    activeVersion: Version;
    activeVersionSubscription: Subscription;

    private concepts = new Subject();

    constructor(private http: HttpClient,
                private authoringService: AuthoringService,
                private branchingService: BranchingService,
                private pathingService: PathingService) {
        this.branchPathSubscription = this.branchingService.getBranchPath().subscribe(data => this.branchPath = data);
        this.activeCodesystemSubscription = this.pathingService.getActiveCodesystem().subscribe(data => this.activeCodesystem = data);
        this.activeVersionSubscription = this.pathingService.getActiveVersion().subscribe(data => this.activeVersion = data);
    }

    setConcepts(concepts) {
        this.concepts.next(concepts);
    }

    getConcepts() {
        return this.concepts.asObservable();
    }

    httpBulkGetConcepts(ids: string[]): Observable<any> {
        const params = {
            conceptIds: ids,
            limit: 10000,
        };

        return this.http.post<any>('/snowstorm/snomed-ct/' + this.activeCodesystem.branchPath + (this.activeVersion ? '/' + this.activeVersion.version : '') + '/concepts/search', params).pipe(map((data: any) => {
            return data.items;
        }));
    }
}
