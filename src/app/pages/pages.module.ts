import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from "../pipes/pipes.module";
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from "@angular/common";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { RutasComponent } from './rutas/rutas.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AgmCoreModule } from '@agm/core';
import { EmpresaComponent } from './empresa/empresa.component';
import { BarriosComponent } from './barrios/barrios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { BarrioComponent } from './barrios/barrio.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { RutaComponent } from './rutas/ruta.component';
import { Empresa1Component } from './empresas/empresa1.component';
import { MarcadoresComponent } from './marcadores/marcadores.component';
import { MarcadorComponent } from './marcadores/marcador.component';
import { ChecklistModule } from 'angular-checklist';

@NgModule({
    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        VehiculosComponent,
        RutasComponent,
        VehiculoComponent,
        BusquedaComponent,
        EmpresaComponent,
        BarriosComponent,
        EmpresasComponent,
        BarrioComponent,
        UsuarioComponent,
        RutaComponent,
        Empresa1Component,
        MarcadoresComponent,
        MarcadorComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        CommonModule,
        ShareModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        ReactiveFormsModule,
        PipesModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAGgspWVCEGTGTKSUTbymXM2Cs2AdV6FEI'
          }),
        ChecklistModule
    ]
})
export class PagesModule { }