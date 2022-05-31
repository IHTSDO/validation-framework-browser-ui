import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ConceptService} from '../../services/concept/concept.service';
import {ReleaseService} from "../../services/release/release.service";
import {FilterService} from "../../services/filter/filter.service";

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    releases: any;
    releasesNotesSubscription: Subscription;
    severity: any;
    severityNotesSubscription: Subscription;
    group: any = [];
    groupNotesSubscription: Subscription;

    chapters = [
        'Introduction',
        'Colours',
        'Typeface',
        'Forms',
        'Modals',
        'Toastr',
        'Libraries',
        'Learning'
    ];

    constructor(private conceptService: ConceptService,
                private releaseService: ReleaseService,
                private filterService: FilterService) {
        this.releasesNotesSubscription = this.releaseService.getReleases().subscribe( data => this.releases = data);
        this.severityNotesSubscription = this.filterService.getSeverity().subscribe( data => this.severity = data);
        this.groupNotesSubscription = this.filterService.getGroup().subscribe( data => this.group = data);
    }

    ngOnInit() {
        this.releaseService.httpGetReleases().subscribe(data => {
            this.releaseService.setReleases(data);
        });
    }

    cloneObject(object): any {
        return JSON.parse(JSON.stringify(object));
    }

    setSeverity(severity: string): void {
        if (severity === this.severity) {
            this.filterService.setSeverity(null);
        } else {
            this.filterService.setSeverity(severity);
        }
    }

    setGroup(group: string): void {
        // console.log('group: ', group);
        // console.log('this.group: ', this.group);
        if (!this.group.includes(group)) {
            this.group.push(group);
            this.filterService.setGroup(this.group);
        } else {
            this.group = this.group.filter(item => item !== group);
            this.filterService.setGroup(this.group);
        }
    }

    groupIncludes(name): boolean {
        if(this.group) {
            return !!this.group.includes(name);
        }
    }
}
