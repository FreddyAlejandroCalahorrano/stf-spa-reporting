import {Routes} from '@angular/router';

import {BaseComponent} from './components/base/base.component';
import {PageErrorComponent} from "./components/page-error/page-error.component";
import {NewPersonReportComponent} from "./components/new-person-report/new-person-report.component";
import {
  UnassignedPersonReportComponent
} from "./components/unassigned-person-report/unassigned-person-report.component";
import {
  DischargedPersonReportComponent
} from "./components/discharged-person-report/discharged-person-report.component";

export let routes: Routes;
routes = [
  {
    path: '',
    redirectTo: 'menu-report',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'new-person-report',
        component: NewPersonReportComponent
      },
      {
        path: 'unassigned-person-report',
        component: UnassignedPersonReportComponent
      },
      {
        path: 'discharged-person-report',
        component: DischargedPersonReportComponent
      }
    ]
  },
  {
    path: 'pg-error',
    component: PageErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'pg-error',
    pathMatch: 'full',
  },
];

