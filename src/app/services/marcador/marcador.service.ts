import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Marcador } from '../../models/marcador.model';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class MarcadorService {

  
  totalMarcadores: number = 0;

  constructor(public http:HttpClient,
              public usuarioService: UsuarioService, 
              public subirArchivoService: SubirArchivoService) { }


cargarMarcadores(desde:number = 0){
    let url = URL_SERVICIOS + '/marcador?desde='+desde;
    return this.http.get(url)
               .map((resp:any)=> {
                this.totalMarcadores = resp.total;
                return resp.marcadores;
               });

  }

  cargarTodos(){
    let url = URL_SERVICIOS + '/marcador/All';
    return this.http.get(url);
  }

  cargarMarcador(id:string){
    let url = URL_SERVICIOS + '/marcador/' + id;
    return this.http.get(url)
        .map((resp:any) => resp.marcador);  
  }

  buscarMarcador(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/marcadores/'+termino;
    return this.http.get(url)
                .map((resp:any)=> resp.marcadores);
  }

  actualizarMarcador(marcador: Marcador, lat:number, lng:number){

    let url = URL_SERVICIOS + '/marcador/';

    if(marcador._id){

      //Actualizando Marcador
    url += marcador._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, {'nombre': marcador.nombre, 'icono': marcador.icono, 'descripcion': marcador.descripcion, 'lat': lat, 'lng': lng})
               .map((resp:any)=> {
                 swal('Marcador actualizado','El Marcador '+ marcador.nombre + ' ha sido actualizado', 'success');
                 return resp.marcador;
                });
      }else{
        //Creando Marcador
        url = URL_SERVICIOS + '/marcador';
        url += '?token=' + this.usuarioService.token;

        return this.http.post(url, {'nombre': marcador.nombre, 'icono': marcador.icono, 'descripcion': marcador.descripcion, 'lat': lat, 'lng': lng})
          .map((resp:any) => {
            swal('Marcador creado', 'El marcador '+marcador.nombre+' ha sido creado.', 'success');
            return resp.marcador;
          });
      }

  }


  borrarMarcador(id: string){
    let url = URL_SERVICIOS + '/marcador/'+id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
               .map(resp => swal('Marcador Eliminado', 'Marcador elimado correctamente', 'success'));
  }

  cambiarImagen(archivo: File, id: string, img:number){
    return this.subirArchivoService.subirArchivoMarcador(archivo,'Marcador', id, img)
        .then((resp:any)=>{
            swal("Imagen Actualizada!", resp.marcador.nombre, "success");
            return resp.marcador;
          
        }).catch(err=>{
          swal("Error!",'La imagen no pudo cargarse, por favor intentalo de nuevo', "warning");
          return false;
        });
  }

}
