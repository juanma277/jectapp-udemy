import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, 
         SidebarService, 
         SharedService, 
         UsuarioService,
         LoginGuardGuard,
         AdminGuard,
         VerificaTokenGuard,
         SubirArchivoService, 
         VehiculoService, 
         RutaService } from "./service.index";
         
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
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
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
