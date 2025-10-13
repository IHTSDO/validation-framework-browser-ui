import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { NgbPopoverModule, NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { provideToastr } from "ngx-toastr";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { headerInterceptorFn } from "./interceptors/header.interceptor";
import { authenticationInterceptorFn } from "./interceptors/authentication.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, NgbTypeaheadModule, NgbPopoverModule),
        provideToastr(),
        provideRouter(routes),
        provideHttpClient(withInterceptors([headerInterceptorFn, authenticationInterceptorFn]))
    ]
};