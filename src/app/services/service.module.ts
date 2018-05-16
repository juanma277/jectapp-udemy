import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4200', options: {origin:'http: // localhost: 4200'} };

import { SettingsService, 
         SidebarService, 
         SharedService, 
         UsuarioService,
         LoginGuardGuard,
         AdminGuard,
         VerificaTokenGuard,
         SubirArchivoService, 
         VehiculoService, 
         RutaService,
         SocketService,
         ChatService, 
         BarriosService,
         UbicacionService,
         EmpresaService, 
         MarcadorService } from "./service.index";
         
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot(config) 
  ],
  providers:[
    SettingsService, 
    SidebarService, 
    SharedService, 
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    VehiculoService,
    RutaService,
    VerificaTokenGuard,
    SocketService,
    ChatService,
    BarriosService,
    UbicacionService,
    EmpresaService,
    MarcadorService
  ],
  declarations: []
})
export class ServiceModule { }
