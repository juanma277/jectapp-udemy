import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Ruta } from '../../models/ruta.model';

@Injectable()
export class RutaService {

  totalRutas: number = 0;
  
  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) { }

  cargarRutas(){
    let url = URL_SERVICIOS + '/ruta';
    return this.http.get(url)
               .map((resp:any) =>{
                 this.totalRutas = resp.total;
                 return resp.rutas;
               }); 

  }

  obtenerRuta(id: string){
    let url = URL_SERVICIOS + '/ruta/'+id;
    return this.http.get(url)
               .map((resp:any) => resp.ruta);

  }

  borrarRuta(id: string){
    let url = URL_SERVICIOS + '/ruta/'+id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
               .map(resp => swal('Ruta Eliminada', 'Ruta elimada correctamente', 'success'));

  }

  crearRuta(nombre: string){
    let url = URL_SERVICIOS + '/ruta';
    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, {nombre})
               .map((resp:any) => resp.ruta );
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
               .map((resp:any)=> resp.ruta);
  }


}
