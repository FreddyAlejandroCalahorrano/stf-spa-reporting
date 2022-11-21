/**
 * Modules
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ExternalAssetsModule} from '@pichincha/angular-sdk/external-assets';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomCommonModule} from "./common/components/common.module";
import {BootstrapModalModule} from "@modal/bootstrap-modal.module";

/**
 * Components
 */
import {AppComponent} from './app.component';
import {BaseComponent} from './components/base/base.component';
import {InputValueAcessorDirective} from "./common/directives/input-value-accessor.directive";
import {PageErrorComponent} from "./components/page-error/page-error.component";

/**
 * Services
 */
import {TribuService} from "@services/tribu.service";
import {CelulaService} from "@services/celula.service";
import {ProfileService} from "@services/profile.service";
import {ProvidersService} from "@services/providers.service";
import {UnassignedPersonReportService} from "@services/unassigned-person-report.service";
import {SeniorityService} from "@services/seniority.service";
import {DischargedPersonReportService} from "@services/discharged-person-report.service";

import {HttpInterceptorRequest} from "@pichincha/angular-sdk/http";
import {INTERCEPTOR_CONFIG_STORAGE, setAuthorization} from "@pichincha/bb-commons/interceptor";
import {EStorageType} from "@pichincha/typescript-sdk";
import {environment} from "@environments/environment";
import {PersonReportService} from "@services/person-report.service";
import {NewPersonReportComponent} from './components/new-person-report/new-person-report.component';
import {
  UnassignedPersonReportComponent
} from './components/unassigned-person-report/unassigned-person-report.component';
import {
  DischargedPersonReportComponent
} from "./components/discharged-person-report/discharged-person-report.component";


export const ConfigStorage = {storageType: EStorageType.SESSION, secretKey: environment.storage.key};

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    InputValueAcessorDirective,
    PageErrorComponent,
    NewPersonReportComponent,
    UnassignedPersonReportComponent,
    DischargedPersonReportComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ExternalAssetsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomCommonModule,
    BootstrapModalModule,
  ],
  providers: [
    {
      provide: HttpInterceptorRequest,
      useValue: setAuthorization
    },
    {
      provide: INTERCEPTOR_CONFIG_STORAGE,
      useValue: ConfigStorage
    },
    TribuService,
    CelulaService,
    ProfileService,
    PersonReportService,
    ProvidersService,
    UnassignedPersonReportService,
    SeniorityService,
    DischargedPersonReportService
  ],
  exports: [AppComponent, BaseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
