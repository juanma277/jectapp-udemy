import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../../models/empresa.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs/Observable';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class EmpresaService {

  constructor(public http: HttpClient,
              public usuarioService:UsuarioService,
              public subirArchivoService:SubirArchivoService  ) {

   }


  cargarEmpresas(desde:number = 0){
    let url = URL_SERVICIOS + '/empresa?desde='+desde;
    return this.http.get(url);
  }

  cargarEmpresasAll(){
    let url = URL_SERVICIOS + '/empresa/All';
    return this.http.get(url);
  }

  cargarEmpresasTodo(){
    let url = URL_SERVICIOS + '/empresa/todo';
    return this.http.get(url);
  }

  buscarEmpresa(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/empresas/'+termino;
    return this.http.get(url)
                .map((resp:any)=> resp.empresas);
  }

  cargarEmpresa(id:string){
    let url = URL_SERVICIOS + '/empresa/obtener/' + id;
    return this.http.get(url)
        .map((resp:any) => resp.empresa);  

  }

  obtenerEmpresa(usuario: Usuario){
    const url = URL_SERVICIOS + '/empresa/'+usuario._id;
    return this.http.get(url);
   }

   actualizarEmpresa(empresa: Empresa){

    let url = URL_SERVICIOS + '/empresa/' + empresa._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, empresa)
               .map((resp:any)=>{
                 swal("Empresa Actualizada!", empresa.nombre, "success");
                 return resp.empresa;
               })
               .catch(err =>{

                //swal (err.error.mensaje, err.error.errors.message, 'error');
                return Observable.throw(err);
              });
  }

  crearEmpresa( empresa: Empresa ){
    let  url = URL_SERVICIOS + '/empresa';
    url += '?token=' + this.usuarioService.token;
    return this.http.post(url, empresa)
               .map((resp: any) => {
                 swal("Empresa Creada!", empresa.nombre, "success");
                 return resp.empresa;
               })
               .catch(err =>{

                 swal (err.error.mensaje, err.error.errors.message, 'error');
                 return Observable.throw(err);

               });
  }

  actualizarUbicacion(id, lat:number, lng:number){
    let url = URL_SERVICIOS + '/empresa/' + id + '/' + lat + '/' +lng ;
    url += '?token=' + this.usuarioService.token;

    return this.http.get(url)
               .map((resp:any)=>{
                 swal("Empresa Actualizada!", 'La ubicación de la empresa se actualizó', "success");
                 return resp.empresa;
               })
               .catch(err =>{

                swal (err.error.mensaje, err.error.errors.message, 'error');
                return Observable.throw(err);
              });

  }

  borrarEmpresa(id: string){
    let url = URL_SERVICIOS + '/empresa/'+id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
               .map(resp => swal('Empresa Eliminada', 'Empresa elimada correctamente', 'success'));
  }

  cambiarImagen(archivo: File, id: string, img:number){
    return this.subirArchivoService.subirArchivoEmpresa(archivo,'Empresas', id, img)
        .then((resp:any)=>{
            swal("Imagen Actualizada!", resp.empresa.nombre, "success");
            return true;
          
        }).catch(err=>{
          swal("Error!",'La imagen no pudo cargarse, por favor intentalo de nuevo', "warning");
          return false;
        });
  }

}
