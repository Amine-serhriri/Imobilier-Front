import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";

import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";

import { FullComponent } from './layout/full/full.component';
import {RouteGuardService} from "./services/route-guard.service";

const routes: Routes = [
  {path :"home",component:HomeComponent},
  {path:"contactus",component:ContactComponent},
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"/home",pathMatch:'full'},
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        canActivate: [RouteGuardService],
        data:{
          expectedRole:['admin', 'user']
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RouteGuardService],
        data:{
          expectedRole:['admin', 'user']
        }
      },
      {
        path: 'Achat',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
