import { NgxSpinnerModule } from 'ngx-spinner';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatListItem, MatListModule} from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
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
import { LoginComponent } from './login/login.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TokenInterceptorInterceptor} from "./services/token-interceptor.interceptor";
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
import { WtspComponent } from './wtsp/wtsp.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ImageComponent } from './image/image.component';
import { ShowImoImagesComponent } from './show-imo-images/show-imo-images.component';
import { AchatListComponent } from './achat-list/achat-list.component';
import { TestComponent } from './test/test.component';
import { AchatDetailsComponent } from './achat-details/achat-details.component';
import { LocationListComponent } from './location-list/location-list.component';
import { AdminLocationComponent } from './admin-location/admin-location.component';
import { VenteComponent } from './vente/vente.component';
import { HighlightDirectiveDirective } from './directives/highlight-directive.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

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
    DetailsComponent,
    WtspComponent,
    ImageComponent,
    ShowImoImagesComponent,
    AchatListComponent,
    TestComponent,
    AchatDetailsComponent,
    LocationListComponent,
    AdminLocationComponent,
    VenteComponent,
    HighlightDirectiveDirective,
    ForgetPasswordComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
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
        MatDialogModule,
        MatSnackBarModule,
        MatBadgeModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        MatExpansionModule,
        MatPaginatorModule


    ],
  providers: [HttpClientModule, {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorInterceptor, multi:true}],

  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
