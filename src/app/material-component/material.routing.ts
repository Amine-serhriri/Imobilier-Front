

import { RouteGuardService } from './../services/route-guard.service';
import { Routes } from '@angular/router';

import {AdminHomeComponent} from "../admin-home/admin-home.component";



export const MaterialRoutes: Routes = [

  {
    path: 'Achat',
    component: AdminHomeComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  }
];
