import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pagesRoutes: Routes = [
    { 
        path: '', component: PagesComponent, 
        children:[
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent , data:{titulo: 'Dashboard'}},
            { path: 'progress', component: ProgressComponent , data:{titulo: 'Progress Bar'} },
            { path: 'account-settings', component: AccountSettingsComponent , data:{titulo: 'Ajustes'}},            
            { path: 'graficas1', component: Graficas1Component , data:{titulo: 'Graficas'} },
            { path: 'promesas', component: PromesasComponent , data:{titulo: 'Promesas'}},
            { path: 'Rxjs', component: RxjsComponent , data:{titulo: 'Obsevables'}},                        
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );