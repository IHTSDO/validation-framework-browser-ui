import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import {PathingService} from '../../services/pathing/pathing.service';
import {Location} from '@angular/common';
import {Codesystem} from "../../models/codesystem";
import {Version} from "../../models/version";
import {Router} from "@angular/router";
import {ReverseAlphabeticalPipe} from "../../pipes/reverse-alphabetical/reverse-alphabetical.pipe";
import {ExceptionsService} from "../../services/exceptions/exceptions.service";

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss'],
    providers: [ReverseAlphabeticalPipe]
})
export class SnomedNavbarComponent implements OnInit {

    environment: string;
    path: string;

    user: User;
    userSubscription: Subscription;

    codesystems: Codesystem[];
    codesystemsSubscription: Subscription;
    activeCodesystem: Codesystem;
    activeCodesystemSubscription: Subscription;

    versions: Version[];
    versionsSubscription: Subscription;
    activeVersion: Version;
    activeVersionSubscription: Subscription;

    constructor(private authenticationService: AuthenticationService,
                private pathingService: PathingService,
                private reverseAlphabeticalPipe: ReverseAlphabeticalPipe,
                private exceptionsService: ExceptionsService,
                private location: Location,
                private router: Router) {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
        this.codesystemsSubscription = this.pathingService.getCodesystems().subscribe(data => this.codesystems = data);
        this.activeCodesystemSubscription = this.pathingService.getActiveCodesystem().subscribe(data => this.activeCodesystem = data);
        this.versionsSubscription = this.pathingService.getVersions().subscribe(data => this.versions = data);
        this.activeVersionSubscription = this.pathingService.getActiveVersion().subscribe(data => this.activeVersion = data);
    }

    ngOnInit() {
        this.path = this.location.path();

        this.pathingService.httpGetCodesystems().subscribe(codesystems => {
            this.pathingService.setCodesystems(codesystems);

            if (this.findCodesystemFromPath(codesystems)) {
                this.pathingService.setActiveCodesystem(this.findCodesystemFromPath(codesystems));

                if (this.findCodesystemFromPath(codesystems).branchPath !== 'MAIN') {
                    this.pathingService.httpGetVersions(this.findCodesystemFromPath(codesystems)).subscribe(versions => {
                        this.pathingService.setVersions(versions);

                        if (this.findVersionFromPath(versions)) {
                            this.pathingService.setActiveVersion(this.findVersionFromPath(versions));
                        }

                        this.exceptionsService.httpGetExceptions().subscribe(exceptions => {
                            this.exceptionsService.setExceptions(exceptions);
                        });
                    });
                }
            }
        });
    }

    findCodesystemFromPath(codesystems: Codesystem[]): Codesystem {
        let codesystemPath = this.path;
        codesystemPath = codesystemPath.replace(/\d{6,18}/g, '');
        codesystemPath = codesystemPath.replace(/\/[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/g, '');

        if (codesystemPath.startsWith('/')) {
            codesystemPath = codesystemPath.substring(1);
        }

        if (codesystemPath.endsWith('/')) {
            codesystemPath = codesystemPath.substring(0, codesystemPath.length - 1);
        }

        return codesystems.find(codesystem => codesystem.branchPath === codesystemPath)!;
    }

    findVersionFromPath(versions: Version[]): Version {
        return versions.find(version => this.path.includes(version.version));
    }

    setCodesystem(codesystem: Codesystem): void {
        this.pathingService.setActiveCodesystem(codesystem);
        this.pathingService.setActiveVersion(undefined);
        this.router.navigate([codesystem.branchPath]);

        if (codesystem.branchPath !== 'MAIN') {
            this.pathingService.httpGetVersions(codesystem).subscribe(versions => {
                this.pathingService.setVersions(versions);
            });

            this.exceptionsService.httpGetExceptions().subscribe(exceptions => {
                this.exceptionsService.setExceptions(exceptions);
            });
        }
    }

    setVersion(version: Version): void {
        this.pathingService.setActiveVersion(version);
        this.router.navigate([this.activeCodesystem.branchPath, version.version]);

        this.exceptionsService.httpGetExceptions().subscribe(exceptions => {
            this.exceptionsService.setExceptions(exceptions);
        });
    }

    findLatestVersion(versions: Version[]): Version {
        return this.reverseAlphabeticalPipe.transform(versions, 'effectiveDate')[0];
    }

    clearExceptions() {
        this.pathingService.setActiveCodesystem(undefined);
        this.pathingService.setActiveVersion(undefined);
        this.pathingService.setVersions(undefined);
        this.exceptionsService.setExceptions(undefined);
        this.router.navigate(['']);
    }

    logout() {
        this.authenticationService.logout();
    }
}
