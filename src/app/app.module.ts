import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";


import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatListItem, MatListModule} from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {FlexModule} from "@angular/flex-layout";
import { ContactComponent } from './contact/contact.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgxPaginationModule} from "ngx-pagination";
import { LoginComponent } from './login/login.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TokenInterceptorInterceptor} from "./services/token-interceptor.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AdminHomeComponent } from './admin-home/admin-home.component';

import {FullComponent} from "./layout/full/full.component";
import {AppHeaderComponent} from "./layout/header/header.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppSidebarComponent} from "./layout/sidebar/sidebar.component";
import {AccordionDirective} from "./shared/accordion/accordion.directive";
import {AccordionAnchorDirective, AccordionLinkDirective} from "./shared/accordion";
import {MatBadgeModule} from "@angular/material/badge";
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ContactComponent,
    LoginComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AccordionDirective,
    AccordionLinkDirective,
    AccordionAnchorDirective,
    AdminHomeComponent,
    DetailsComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        FlexModule,
        MatFormFieldModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatCardModule,
        MatIconModule,
        NgxPaginationModule,
        MatDialogModule,
        NgxSpinnerModule,
        MatSnackBarModule,
        MatBadgeModule


    ],
  providers: [HttpClientModule, {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorInterceptor, multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
