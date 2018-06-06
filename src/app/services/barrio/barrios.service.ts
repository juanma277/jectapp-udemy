import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Barrio } from '../../models/barrio.model';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class BarriosService {

  totalBarrios: number = 0;
  dataOrigen: Barrio[];
  dataDestino: Barrio[];
  


  constructor(public http:HttpClient,
              public usuarioService: UsuarioService) { }


  cargarBarrios(){
    let url = URL_SERVICIOS + '/barrio/all';
    return this.http.get(url)
               .map((resp:any)=> {
                this.totalBarrios = resp.total;
                return resp.barrios;
               });

  }

  cargarBarriosPaginados(desde:number = 0){
    let url = URL_SERVICIOS + '/barrio?desde='+desde;
    return this.http.get(url);

  }


  buscarCoordenadasOrigen(nombre:string){   
    const url = URL_SERVICIOS + '/barrio/' + nombre ;
    return this.http.get(url)
               .map((resp:any)=> {
                 this.dataOrigen = resp.barrio;
                return resp.barrio;
               });    
  }

  buscarCoordenadasDestino(nombre:string){   
    const url = URL_SERVICIOS + '/barrio/' + nombre ;
    return this.http.get(url)
               .map((resp:any)=> {
                 this.dataDestino = resp.barrio;
                return resp.barrio;
               });    
  }


  actualizarBarrio(barrio: Barrio){

    let url = URL_SERVICIOS + '/barrio/';

    if(barrio._id){

      url += barrio._id;
      url += '?token=' + this.usuarioService.token;

    return this.http.put(url, barrio)
               .map((resp:any)=> {
                 swal('Barrio actualizado','El barrio '+ barrio.nombre + ' ha sido actualizado', 'success');
                 return true;
                });

    }

    
  }

  actualizarBarrioNombre(barrio: Barrio, lat:number, lng:number){

    let url = URL_SERVICIOS + '/barrio/nombre/';

    if(barrio._id){

      //Actualizando Barrio

    url += barrio._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, barrio)
               .map((resp:any)=> {
                 swal('Barrio actualizado','El barrio '+ barrio.nombre + ' ha sido actualizado', 'success');
                 return true;
                });
      }else{
        //Creando Barrio
        url = URL_SERVICIOS + '/barrio';
        url += '?token=' + this.usuarioService.token;

        return this.http.post(url, {'nombre': barrio.nombre, 'lat': lat, 'lng': lng})
          .map((resp:any) => {
            swal('Barrio creado', 'El barrio '+barrio.nombre+' ha sido creado.', 'success');
            return resp.barrio;
          });
      }

  }

  actualizarBarrioNombreCoordenadas(barrio: Barrio, lat:number, lng:number){

    let url = URL_SERVICIOS + '/barrio/nombre/coordenadas/';

    if(barrio._id){

      //Actualizando Barrio
      url += barrio._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, {'nombre': barrio.nombre, 'lat': lat, 'lng': lng})
               .map((resp:any)=> {
                 swal('Barrio actualizado','El barrio '+ barrio.nombre + ' ha sido actualizado', 'success');
                 return true;
                });
    }else{
      //Creando Barrio
      url = URL_SERVICIOS + '/barrio';
      url += '?token=' + this.usuarioService.token;

      return this.http.post(url, {'nombre': barrio.nombre, 'lat': lat, 'lng': lng})
        .map((resp:any) => {
          swal('Barrio creado', 'El barrio '+barrio.nombre+' ha sido creado.', 'success');
          return resp.barrio;
        });
    }
    
  }

  borrarBarrio(id: string){
    let url = URL_SERVICIOS + '/barrio/'+id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
               .map(resp => swal('Barrio Eliminado', 'Barrio elimado correctamente', 'success'));
  }

  buscarBarrio(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/barrios/'+termino;
    return this.http.get(url)
                .map((resp:any)=> resp.barrios);

  }

  cargarBarrio(id: string){
    let url = URL_SERVICIOS + '/barrio/obtener/' + id;
    return this.http.get(url)
        .map((resp:any) => resp.barrio);  
  }




}
