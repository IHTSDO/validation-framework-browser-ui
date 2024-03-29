import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from './interceptors/header.interceptor';
import {NgbPopoverModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {SnomedNavbarComponent} from './components/snomed-navbar/snomed-navbar.component';
import {SnomedFooterComponent} from './components/snomed-footer/snomed-footer.component';
import {AuthenticationService} from './services/authentication/authentication.service';
import {AuthoringService} from './services/authoring/authoring.service';
import {EnvServiceProvider} from './providers/env.service.provider';
import {ToastrModule} from 'ngx-toastr';
import {StatusPageService} from './services/statusPage/status-page.service';
import {PathingService} from './services/pathing/pathing.service';
import {AlphabeticalPipe} from './pipes/alphabetical/alphabetical.pipe';
import {BranchPipe} from './pipes/branch/branch.pipe';
import {ProjectPipe} from './pipes/project/project.pipe';
import {AppRoutingModule} from './app-routing.module';
import {ModalService} from './services/modal/modal.service';
import {ModalComponent} from './components/modal/modal.component';
import {LeftSidebarComponent} from './components/left-sidebar/left-sidebar.component';
import {TextFilterPipe} from './pipes/text-filter/text-filter.pipe';
import {ConceptService} from './services/concept/concept.service';
import {MainViewComponent} from './components/main-view/main-view.component';
import {ReleaseService} from './services/release/release.service';
import {GroupFilterPipe} from './pipes/group-filter/group-filter.pipe';
import {SeverityFilterPipe} from './pipes/severity-filter/severity-filter.pipe';
import {TypeFilterPipe} from './pipes/type-filter/type-filter.pipe';
import {AuthoringPipe} from './pipes/authoring-filter/authoring.pipe';
import {EditionPipe} from './pipes/edition/edition.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';
import {AuthenticationInterceptor} from "./interceptors/authentication.interceptor";
import {ExceptionsService} from "./services/exceptions/exceptions.service";
import { ExceptionsPipe } from './pipes/exceptions/exceptions.pipe';
import { ExceptionsTablePipe } from './pipes/exceptions-table/exceptions-table.pipe';
import {ReverseAlphabeticalPipe} from "./pipes/reverse-alphabetical/reverse-alphabetical.pipe";

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        AlphabeticalPipe,
        BranchPipe,
        ProjectPipe,
        ModalComponent,
        LeftSidebarComponent,
        TextFilterPipe,
        MainViewComponent,
        GroupFilterPipe,
        SeverityFilterPipe,
        TypeFilterPipe,
        AuthoringPipe,
        EditionPipe,
        SortPipe,
        ExceptionsPipe,
        ReverseAlphabeticalPipe,
        ExceptionsTablePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbTypeaheadModule,
        AppRoutingModule,
        NgbPopoverModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        AuthenticationService,
        AuthoringService,
        StatusPageService,
        ModalService,
        PathingService,
        ConceptService,
        ReleaseService,
        ExceptionsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
