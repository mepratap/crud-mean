import { Routes, CanActivate } from '@angular/router';

import { 
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    DashboardComponent
} from './components/index';

import { AuthGuardService } from './services/index';

export const APP_ROUTES: Routes = [
    {path: '', component: HomeComponent, },
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'profile', component: ProfileComponent, canActivate: [ AuthGuardService ]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] }
];
