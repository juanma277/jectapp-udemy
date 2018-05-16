import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { RutasComponent } from './rutas/rutas.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { BarriosComponent } from './barrios/barrios.component';
import { BarrioComponent } from './barrios/barrio.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { RutaComponent } from './rutas/ruta.component';
import { Empresa1Component } from './empresas/empresa1.component';
import { MarcadoresComponent } from './marcadores/marcadores.component';
import { MarcadorComponent } from './marcadores/marcador.component';

const pagesRoutes: Routes = [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent , data:{titulo: 'Dashboard'}},
            { path: 'progress', component: ProgressComponent , data:{titulo: 'Progress Bar'} },
            { path: 'account-settings', component: AccountSettingsComponent , data:{titulo: 'Ajustes'}},                        
            { path: 'graficas1', component: Graficas1Component , data:{titulo: 'Graficas'} },
            { path: 'perfil', component: ProfileComponent , data:{titulo: 'Perfil de Usuario'}},
            { path: 'empresa', component: EmpresaComponent , data:{titulo: 'Datos de Empresa'}},            
            { path: 'promesas', component: PromesasComponent , data:{titulo: 'Promesas'}},
            { path: 'Rxjs', component: RxjsComponent , data:{titulo: 'Obsevables'}}, 
            { path: 'busqueda/:termino', component: BusquedaComponent , data:{titulo: 'Buscador'}},

            //Mantenimiento
            { 
                path: 'usuarios', 
                component: UsuariosComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Mantenimiento de Usuarios'}
            },
            { 
                path: 'usuario/:id', 
                component: UsuarioComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Crear Usuario'}
            },
            { 
                path: 'rutas', 
                component: RutasComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Mantenimiento de Rutas'}
            },
            { 
                path: 'ruta/:id', 
                component: RutaComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Crear/Actualizar ruta'}
            },
            { 
                path: 'vehiculos',
                component: VehiculosComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Mantenimiento de Vehiculos'}
            },
            { 
                path: 'vehiculo/:id', 
                component: VehiculoComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Crear/Actualizar vehiculo'}
            },
            { 
                path: 'empresas', 
                component: EmpresasComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Mantenimiento de Empresas'}
            },
            { 
                path: 'empresa/:id', 
                component: Empresa1Component, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Crear/Actualizar Empresa'}
            },
            { 
                path: 'barrios', 
                component: BarriosComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Mantenimientos de Barrios'}
            },
            { 
                path: 'barrio/:id', 
                component: BarrioComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Crear/Actualizar Barrio'}
            },            
            { 
                path: 'marcadores', 
                component: MarcadoresComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Mantenimiento de Marcadores'}
            },
            { 
                path: 'marcador/:id', 
                component: MarcadorComponent, 
                canActivate: [ AdminGuard ], 
                data:{titulo: 'Crear/Actualizar Marcadores'}
            }
    
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );