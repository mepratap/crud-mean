import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';

import {
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent
} from './components/index';

import { 
    UserService,
    ValidatorService,
    AuthGuardService } from './services/index';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        ProfileComponent,
        RegisterComponent,
        HomeComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(APP_ROUTES)
    ],
    providers: [UserService, ValidatorService, AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
