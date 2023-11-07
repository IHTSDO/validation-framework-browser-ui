import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ConceptService} from '../../services/concept/concept.service';
import {ReleaseService} from '../../services/release/release.service';
import {FilterService} from '../../services/filter/filter.service';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    additive: any;
    additiveSubscription: Subscription;
    textFilter: any;
    textFilterSubscription: Subscription;
    assertions: any;
    assertionsNotesSubscription: Subscription;
    releases: any;
    releasesNotesSubscription: Subscription;
    severity: any;
    severityNotesSubscription: Subscription;
    group: any = [];
    groupNotesSubscription: Subscription;

    constructor(private conceptService: ConceptService,
                private releaseService: ReleaseService,
                private filterService: FilterService) {
        this.releasesNotesSubscription = this.releaseService.getReleases().subscribe( data => this.releases = data);
        this.severityNotesSubscription = this.filterService.getSeverity().subscribe( data => this.severity = data);
        this.groupNotesSubscription = this.filterService.getGroup().subscribe( data => this.group = data);
        this.textFilterSubscription = this.filterService.getTextFilter().subscribe(data => this.textFilter = data);
        this.additiveSubscription = this.filterService.getAdditive().subscribe(data => this.additive = data);
        this.assertionsNotesSubscription = this.releaseService.getAssertions().subscribe( data => this.assertions = data);
    }

    ngOnInit() {
        this.releaseService.httpGetReleases().subscribe(data => {
            this.releaseService.setReleases(data);
        });
    }

    cloneObject(object): any {
        return JSON.parse(JSON.stringify(object));
    }

    toggleAdditive(): void {
        this.filterService.setAdditive(!this.additive);
    }

    setSeverity(severity: string): void {
        if (severity === this.severity) {
            this.filterService.setSeverity(null);
        } else {
            this.filterService.setSeverity(severity);
        }
    }

    setGroup(group: string): void {
        if (!this.group.includes(group)) {
            this.group.push(group);
            this.filterService.setGroup(this.group);
        } else {
            this.group = this.group.filter(item => item !== group);
            this.filterService.setGroup(this.group);
        }
    }

    groupIncludes(name): any {
        if (this.group) {
            return !!this.group.includes(name);
        }
    }

    reset(): void {
        this.filterService.setSeverity(undefined);
        this.filterService.setType(undefined);
        this.filterService.setGroup([]);
        this.filterService.setTextFilter('');
    }

    containsDrools(name: string): boolean {
        let drools = false;

        if (this.assertions) {
            let filteredAssertions = this.assertions?.filter(assertion => assertion.groups?.includes(name));

            filteredAssertions.forEach(assertion => {
                if (assertion?.type === 'DROOL_RULES') {
                    drools = true;
                }
            });
        }

        return drools;
    }

    contains(name: string, type: string) {
        let found = false;

        if (this.assertions) {
            let filteredAssertions = this.assertions?.filter(assertion => assertion.groups?.includes(name));

            filteredAssertions.forEach(assertion => {
                if (assertion?.type === type) {
                    found = true;
                }
            });
        }

        return found;
    }
}
