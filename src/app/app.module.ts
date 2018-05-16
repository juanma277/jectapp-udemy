import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Rutas
import { APP_ROUTES } from './app.routes';

//Modulos
import { PagesModule } from './pages/pages.module';

//Servicios
import { ServiceModule  } from "./services/service.module";


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { SettingsService } from './services/service.index';
import { ShareModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { AgmCoreModule } from '@agm/core';
import { TypeaheadModule } from 'ngx-bootstrap';
import { PipesModule } from './pipes/pipes.module';
import { AgmDirectionModule } from 'agm-direction';
//import { TypeaheadModule } from 'ngx-type-ahead';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    ShareModule,
    PipesModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGgspWVCEGTGTKSUTbymXM2Cs2AdV6FEI'
    }),
    //TypeaheadModule
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
