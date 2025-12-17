import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ConceptService} from '../../services/concept/concept.service';
import {ReleaseService} from '../../services/release/release.service';
import {FilterService} from '../../services/filter/filter.service';
import {ActivatedRoute} from "@angular/router";
import { CommonModule } from '@angular/common';
import { AlphabeticalPipe } from '../../pipes/alphabetical/alphabetical.pipe';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss'],
    imports: [CommonModule, AlphabeticalPipe]
})
export class LeftSidebarComponent implements OnInit {

    additive: any;
    additiveSubscription: Subscription;
    textFilter: any;
    textFilterSubscription: Subscription;
    assertions: any;
    assertionsSubscription: Subscription;
    releases: any;
    releasesSubscription: Subscription;
    severity: any;
    severitySubscription: Subscription;
    group: any;
    groupSubscription: Subscription;

    constructor(private conceptService: ConceptService,
                private releaseService: ReleaseService,
                private filterService: FilterService,
                private route: ActivatedRoute) {
        this.releasesSubscription = this.releaseService.getReleases().subscribe( data => this.releases = data);
        this.severitySubscription = this.filterService.getSeverity().subscribe( data => this.severity = data);
        this.groupSubscription = this.filterService.getGroup().subscribe( data => this.group = data);
        this.textFilterSubscription = this.filterService.getTextFilter().subscribe(data => this.textFilter = data);
        this.additiveSubscription = this.filterService.getAdditive().subscribe(data => this.additive = data);
        this.assertionsSubscription = this.releaseService.getAssertions().subscribe( data => this.assertions = data);
    }

    ngOnInit() {
        this.releaseService.httpGetReleases().subscribe(data => {
            this.releaseService.setReleases(data);

            this.route.queryParams.subscribe(params => {
                if (params['assertionGroup']) {
                    let parameters = params['assertionGroup'].split(',');
                    parameters.forEach(parameter => {
                        this.group.push(parameter);
                    })
                }
            });
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
