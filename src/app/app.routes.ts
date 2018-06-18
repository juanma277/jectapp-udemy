import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './services/service.index';
import { PrincipalComponent } from './principal/principal.component';
import { RecordarComponent } from './password/recordar.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'inicio', component: PrincipalComponent },
    { path: 'recover/:id', component: RecordarComponent },    
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});