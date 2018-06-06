import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Ruta } from '../../models/ruta.model';

@Injectable()
export class RutaService {

  nombresBarrios= new Object();;
 
  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) { }

  cargarRutas(desde:number = 0){
    let url = URL_SERVICIOS + '/ruta?desde='+desde;
    return this.http.get(url);
  }

  cargarRutasAll(){
    let url = URL_SERVICIOS + '/ruta/All';
    return this.http.get(url);
  }

  obtenerRuta(id: string){
    let url = URL_SERVICIOS + '/ruta/'+id;
    return this.http.get(url)
               .map((resp:any) => resp.ruta);
  }

  buscarRutasPorBarrio(origen:string, destino:string){
    let url = URL_SERVICIOS + '/ruta/All';
    return this.http.get(url).map((resp:any)=>{
      return resp.rutas;
    });
  }

  borrarRuta(id: string){
    let url = URL_SERVICIOS + '/ruta/'+id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
               .map(resp => swal('Ruta Eliminada', 'Ruta elimada correctamente', 'success'));
  }

  guardarRuta(ruta: Ruta, barrios){
    let url = URL_SERVICIOS + '/ruta'; 

     
    if (ruta._id){
      //Actualizando
      url += '/' +ruta._id;
      url += '?token=' + this.usuarioService.token;     

      return this.http.put(url, {nombre: ruta.nombre, empresa:ruta.empresa, barrios:barrios})
                .map((resp:any) => {
                  swal('Ruta actualizada', 'La ruta '+ruta.nombre+' ha sido actualizada.', 'success');
                  return resp.ruta;          
                });
    }else{
      //Creando
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, ruta)
        .map((resp:any) => {
          swal('Ruta creada', 'La Ruta '+ruta.nombre+' ha sido creada.', 'success');
          return resp.ruta;
        });
    }
    
  }

  crearRuta(nombre: string){
    let url = URL_SERVICIOS + '/ruta';
    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, {nombre})
               .map((resp:any) => resp.ruta );
  }

  actualizarCoordenadas(ruta:Ruta, lat_origen:number, lng_origen:number, lat_destino:number, lng_destino:number){
    let url = URL_SERVICIOS + '/ruta/coordenadas/'+ ruta._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, {'lat_origen':lat_origen, 'lng_origen':lng_origen, 'lat_destino':lat_destino, 'lng_destino':lng_destino })
                .map((resp:any) => {
                  swal('Ruta actualizada', 'La ruta '+ruta.nombre+' ha sido actualizada.', 'success');
                  return resp.ruta;          
                });
    
    
  }

  buscarRuta(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/rutas/'+termino;
    return this.http.get(url)
                .map((resp:any)=> resp.rutas);
  }

  actualizarRuta(ruta: Ruta){
    let url = URL_SERVICIOS + '/ruta/'+ ruta._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, ruta)
               .map((resp:any)=> {
                 swal('Ruta actualizada','La ruta '+ ruta.nombre + 'ha sido actualizado', 'success');
                 return true;
                });
  }

  buscarRutaOrigenDestino(lat_origen: number, lng_origen:number, lat_destino:number, lng_destino:number){
    let url = URL_SERVICIOS +'/ruta/'+ lat_origen +'/' + lng_origen + '/' + lat_destino + '/' + lng_destino;
    return this.http.get(url);
  }


}
