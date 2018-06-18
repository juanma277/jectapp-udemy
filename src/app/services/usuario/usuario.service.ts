import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( public http: HttpClient,
               public router: Router,
               public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
   }


   renuevaToken(){
    let  url = URL_SERVICIOS + '/login/renuevaToken';
    url += '?token=' + this.token;

    return this.http.get(url)
               .map((resp:any) =>{
                 this.token = resp.token;
                 localStorage.setItem('token', this.token);
                 return true;
               })
               .catch(err =>{
                this.router.navigate(['/login']);
                swal ('Error Token', 'No fue posible renovar el Token', 'error');
                return Observable.throw(err);
               });
   }


   logueado(){
     return (this.token.length > 5) ? true : false;
   }

   guardarStorage(id:string, token:string, usuario: Usuario, menu: any){
     localStorage.setItem('ID', id);
     localStorage.setItem('token', token);
     localStorage.setItem('usuario', JSON.stringify(usuario));
     localStorage.setItem('menu', JSON.stringify(menu));
     

     this.usuario = usuario;
     this.token = token;
     this.menu = menu;
   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse( localStorage.getItem('usuario'));
       this.menu = JSON.parse( localStorage.getItem('menu'));       
     }else{
       this.token = '';
       this.usuario = null;
       this.menu = [];       
     }
   }

   logout(){
     this.usuario = null;
     this.token = '';
     this.menu = [];

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');
     

     this.router.navigate(['/inicio']);
     
   }

   loginGoogle(token: string){
     const url = URL_SERVICIOS + '/login/google';

     return this.http.post(url, {token})
                .map((resp:any)=>{
                  this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                    return true;
                  })
                  .catch(err =>{
                    swal ('Error', 'Datos Incorrectos', 'error');
                    return Observable.throw(err);
                  });
   }

   crearUsuario( usuario: Usuario ){

     const url = URL_SERVICIOS + '/usuario';
     return this.http.post(url, usuario)
                .map((resp: any) => {
                  swal("Usuario Creado!", usuario.email, "success");
                  return resp.usuario;
                })
                .catch(err =>{

                  swal (err.error.mensaje, err.error.errors.message, 'error');
                  return Observable.throw(err);

                });
   }
 
   actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
               .map((resp:any)=>{

                if(usuario._id === this.usuario._id){
                  let usuarioDB: Usuario = resp.usuario;
                  this.guardarStorage(usuarioDB._id, this.token,  usuarioDB, this.menu);
                }
              
                 swal('Usuario Actualizado!', usuario.nombre, 'success');

                 return true;
               })
               .catch(err =>{

                swal (err.error.mensaje, err.error.errors.message, 'error');
                return Observable.throw(err);

              });

  }
 
   cambiarImagen(archivo: File, id: string){
     this.subirArchivoService.subirArchivo(archivo,'Usuarios', id)
         .then((resp:any)=>{
          
          this.usuario.img = resp.usuario.img;
          this.guardarStorage(id, this.token, this.usuario, this.menu);
          swal("Imagen Actualizada!", this.usuario.nombre, "success");
           
         }).catch(resp=>{
           console.log(resp);
         });
     
   }

   cargarUsuarios(desde:number = 0){
    let url = URL_SERVICIOS + '/usuario?desde='+desde;
    return this.http.get(url);

   }

   cargarUsuariosAll(){
    let url = URL_SERVICIOS + '/usuario/all'
    return this.http.get(url);

   }

   buscarUsuario(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url)
                .map((resp:any)=> resp.usuarios);
     
   }

   resetPassword(id:string){
    let url = URL_SERVICIOS + '/usuario/reset/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
               .map(resp =>{
                 swal('Usuario actualizado','La contraseña del usuario ha sido reestablecida', 'success');
                 return true;
               });
   }

   cambiarPassword(id:string, password:string){
    let url = URL_SERVICIOS + '/usuario/password/reset/' + id;
    url += '?token=' + this.token;
    return this.http.post(url, {'password':password })
               .map(resp =>{
                 swal('Usuario actualizado','La contraseña del usuario ha sido actualizada', 'success');
                 return true;
               });
   }

   recoverPassword(id:string, password:string){
    let url = URL_SERVICIOS + '/usuario/password/recover/' + id;
    return this.http.post(url, {'password':password })
               .map(resp =>{
                 swal('Usuario actualizado','La contraseña del usuario ha sido actualizada', 'success');
                 return true;
               });
   }

   recordarPassword(email:string){
     let url = URL_SERVICIOS + '/usuario/password/recordar/'+email;
     return this.http.get(url);

   }

   borrarUsuario(id:string){
     let url = URL_SERVICIOS + '/usuario/' + id;
     url += '?token=' + this.token;
     return this.http.delete(url)
                .map(resp =>{
                  swal('Usuario eliminado','El usuario ha sido eliminado correctamente', 'success');
                  return true;
                });

   }



}
