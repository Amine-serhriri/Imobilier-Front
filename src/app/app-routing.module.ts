import { AchatDetailsComponent } from './achat-details/achat-details.component';
import { TestComponent } from './test/test.component';
import { AchatListComponent } from './achat-list/achat-list.component';
import { ImoAchatResolveService } from './services/imo-achat-resolve.service';
import { Imobiler } from './Model/Imobiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";

import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";

import { FullComponent } from './layout/full/full.component';
import {RouteGuardService} from "./services/route-guard.service";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  {path :"home",component:HomeComponent},
  {path:"contactus",component:ContactComponent},
  {path:"detail/:id",component:DetailsComponent},
  {path:"test",component:TestComponent},
  {path:"login",component:LoginComponent},
  {path:"achatList",component:AchatListComponent},
  {path:"achatDetails/:id",component:AchatDetailsComponent, resolve: {imoAchat:ImoAchatResolveService}},
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
        },
        resolve: {
          imoAchat:ImoAchatResolveService
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
