import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ModalService} from '../../services/modal/modal.service';
import {ReleaseService} from "../../services/release/release.service";
import {Subscription} from "rxjs";
import {FilterService} from "../../services/filter/filter.service";

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    toastrConfig = {
        closeButton: true
    };

    textFilter: string;

    releases: any;
    releasesNotesSubscription: Subscription;
    assertions: any;
    assertionsNotesSubscription: Subscription;
    severity: any;
    severityNotesSubscription: Subscription;
    group: any;
    groupNotesSubscription: Subscription;
    type: any;
    typeSubscription: Subscription;

    constructor(private toastr: ToastrService,
                private modalService: ModalService,
                private releaseService: ReleaseService,
                private filterService: FilterService) {
        this.releasesNotesSubscription = this.releaseService.getReleases().subscribe( data => this.releases = data);
        this.assertionsNotesSubscription = this.releaseService.getAssertions().subscribe( data => this.assertions = data);
        this.severityNotesSubscription = this.filterService.getSeverity().subscribe( data => this.severity = data);
        this.groupNotesSubscription = this.filterService.getGroup().subscribe( data => this.group = data);
        this.typeSubscription = this.filterService.getType().subscribe( data => this.type = data);
    }

    ngOnInit(): void {
        this.releaseService.httpGetAssertions().subscribe(data => {
            this.releaseService.setAssertions(data);
        });
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

    delete(): void {
        this.toastr.error('This doesn\'t really delete anything', 'DELETE', this.toastrConfig);
    }

    save(): void {
        this.toastr.success('This doesn\'t really save anything', 'SAVE', this.toastrConfig);
    }
}
