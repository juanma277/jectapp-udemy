import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import * as swal from 'sweetalert';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
              public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
   }


   logueado(){
     return (this.token.length > 5) ? true : false;
   }

   guardarStorage(id:string, token:string, usuario: Usuario){
     localStorage.setItem('ID', id);
     localStorage.setItem('token', token);
     localStorage.setItem('usuario', JSON.stringify(usuario));

     this.usuario = usuario;
     this.token = token;
   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse( localStorage.getItem('usuario'));
     }else{
       this.token = '';
       this.usuario = null;
     }
   }

   logout(){
     this.usuario = null;
     this.token = '';

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');

     this.router.navigate(['/login']);
     
   }

   loginGoogle(token: string){
     const url = URL_SERVICIOS + '/login/google';

     return this.http.post(url, {token})
                .map((resp:any)=>{
                  this.guardarStorage(resp.id, resp.token, resp.usuario);
                  return true;
                });
   }

   login(usuario: Usuario, recordar: boolean = false){

    if(recordar === true){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    
      const url = URL_SERVICIOS + '/login';
      return this.http.post(url, usuario )
                  .map((resp:any) =>{
                    this.guardarStorage(resp.id, resp.token, resp.usuario);
                    return true;
                  });
   }

   crearUsuario( usuario: Usuario ){

     const url = URL_SERVICIOS + '/usuario';
     return this.http.post(url, usuario)
                .map((resp: any) => {
                  swal("Usuario Creado!", usuario.email, "success");
                  return resp.usuario;
                });
   }

   actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
               .map((resp:any)=>{
                 let usuarioDB: Usuario = resp.usuario;

                 this.guardarStorage(usuarioDB._id, this.token,  usuarioDB);
                 swal("Usuario Actualizado!", usuario.nombre, "success");

                 return true;
               });

   }

   cambiarImagen(archivo: File, id: string){
     this.subirArchivoService.subirArchivo(archivo,'Usuarios', id)
         .then(resp=>{
          console.log(resp);
           

         }).catch(resp=>{
           console.log(resp);
         });
     
   }



}
