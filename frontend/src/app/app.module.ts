import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
    MatMomentDateModule,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { Wesleyan } from './utils/wesleyan';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/views/layout/header/header.component';
import { SidebarComponent } from './components/views/layout/sidebar/sidebar.component';
import { ErrorComponent } from './components/views/pages/error/error.component';
import { HomeComponent } from './components/views/pages/home/home.component';
import { MembersComponent } from './components/views/pages/members/members.component';
import { OrganizationsComponent } from './components/views/pages/organizations/organizations.component';
import { TithesComponent } from './components/views/pages/tithes/tithes.component';
import { ConverstationCardComponent } from './components/views/ui/elements/converstation-card/converstation-card.component';
import { MailComponent } from './components/views/ui/elements/mail/mail.component';
import { AuthenticationComponent } from './components/auth/authentication/authentication.component';
import { MembersMemberPreviewComponent } from './components/views/ui/elements/members-member-preview/members-member-preview.component';
import { XwesleyanPagexComponent } from './components/views/pages/xwesleyan-pagex/xwesleyan-pagex.component';
import { TithesTithePaymentPreviewComponent } from './components/views/ui/elements/tithes-tithe-payment-preview/tithes-tithe-payment-preview.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        ErrorComponent,
        HomeComponent,
        MembersComponent,
        OrganizationsComponent,
        TithesComponent,
        ConverstationCardComponent,
        MailComponent,
        AuthenticationComponent,
        MembersMemberPreviewComponent,
        XwesleyanPagexComponent,
        TithesTithePaymentPreviewComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        GraphQLModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSlideToggleModule,
        MatCheckboxModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: Wesleyan.WS_DATE_FORMATS_DATE },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
