import { AdminLocationComponent } from './../admin-location/admin-location.component';


import { RouteGuardService } from './../services/route-guard.service';
import { Routes } from '@angular/router';

import {AdminHomeComponent} from "../admin-home/admin-home.component";
import { ImoAchatResolveService } from '../services/imo-achat-resolve.service';



export const MaterialRoutes: Routes = [

  {
    path: 'Achat',
    component: AdminHomeComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
    resolve: {
      imoAchat:ImoAchatResolveService
    }
  },
  {
    path: 'locationn',
    component: AdminLocationComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
    resolve: {
      imoAchat:ImoAchatResolveService
    }
  }
];
