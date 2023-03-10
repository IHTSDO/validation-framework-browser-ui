import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ModalService} from '../../services/modal/modal.service';
import {ReleaseService} from '../../services/release/release.service';
import {Subscription} from 'rxjs';
import {FilterService} from '../../services/filter/filter.service';
import {saveAs} from "file-saver";
import {TextFilterPipe} from "../../pipes/text-filter/text-filter.pipe";
import {GroupFilterPipe} from "../../pipes/group-filter/group-filter.pipe";
import {SeverityFilterPipe} from "../../pipes/severity-filter/severity-filter.pipe";
import {TypeFilterPipe} from "../../pipes/type-filter/type-filter.pipe";

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss'],
    providers: [
        TextFilterPipe,
        GroupFilterPipe,
        SeverityFilterPipe,
        TypeFilterPipe
    ]
})
export class MainViewComponent implements OnInit {

    toastrConfig = {
        closeButton: true
    };

    releases: any;
    releasesNotesSubscription: Subscription;
    assertions: any;
    assertionsNotesSubscription: Subscription;
    textFilter: any;
    textFilterSubscription: Subscription;
    severity: any;
    severityNotesSubscription: Subscription;
    group: any;
    groupNotesSubscription: Subscription;
    type: any;
    typeSubscription: Subscription;

    activeAssertion: any;

    sortKey: string;
    sortType: string;
    localAssertions: any;

    constructor(private toastr: ToastrService,
                private modalService: ModalService,
                private releaseService: ReleaseService,
                private filterService: FilterService,
                private textPipe: TextFilterPipe,
                private groupPipe: GroupFilterPipe,
                private severityPipe: SeverityFilterPipe,
                private typePipe: TypeFilterPipe) {
        this.releasesNotesSubscription = this.releaseService.getReleases().subscribe( data => this.releases = data);
        this.assertionsNotesSubscription = this.releaseService.getAssertions().subscribe( data => {
            this.assertions = data;
            if (!this.localAssertions) {
                this.localAssertions = this.cloneObject(data);
            }
        });
        this.severityNotesSubscription = this.filterService.getSeverity().subscribe( data => this.severity = data);
        this.groupNotesSubscription = this.filterService.getGroup().subscribe( data => this.group = data);
        this.typeSubscription = this.filterService.getType().subscribe( data => this.type = data);
        this.textFilterSubscription = this.filterService.getTextFilter().subscribe(data => this.textFilter = data);
    }

    ngOnInit(): void {
        this.releaseService.httpGetAssertions().subscribe(data => {
            this.releaseService.setAssertions(data);
        });

        this.sortType = 'default';
    }

    sortOn(key: string) {

        if (this.sortKey === key) {
            this.sortKey = key;
            if (this.sortType === 'default') {
                this.sortType = 'desc';
            } else if (this.sortType === 'desc') {
                this.sortType = 'asc';
            } else if (this.sortType === 'asc') {
                this.sortType = 'default';
                this.localAssertions = this.cloneObject(this.assertions);
            }
        } else {
            this.sortKey = key;
            this.sortType = 'desc';
        }
    }

    setType(type: string): void {
        if (type === this.type) {
            this.filterService.setType(undefined);
        } else {
            this.filterService.setType(type);
        }
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    downloadTSV(): void {
        const tsvContent = this.createTSV(this.assertions).map(e => e.join("\t")).join("\n")

        const data: Blob = new Blob([tsvContent], {
            type: "text/tsv;charset=utf-8"
        });

        saveAs(data, "assertions.tsv");
    }

    goToUrl(assertion: any): void {
        window.open(assertion.url, '_blank').focus();
    }

    createTSV(assertions): any {
        assertions = this.textPipe.transform(assertions, this.textFilter);
        assertions = this.groupPipe.transform(assertions, this.group);
        assertions = this.severityPipe.transform(assertions, this.severity);
        assertions = this.typePipe.transform(assertions, this.type);

        const tsvArray = [];

        tsvArray.push(['UUID', 'Description']);

        assertions.forEach(assertion => {
            const row = [];
            row.push(assertion.uuid);
            row.push(assertion.assertionText);
            tsvArray.push(row);
        });

        return tsvArray;
    }

    cloneObject(object): any {
        return JSON.parse(JSON.stringify(object));
    }

    delete(): void {
        this.toastr.error('This doesn\'t really delete anything', 'DELETE', this.toastrConfig);
    }

    save(): void {
        this.toastr.success('This doesn\'t really save anything', 'SAVE', this.toastrConfig);
    }
}
