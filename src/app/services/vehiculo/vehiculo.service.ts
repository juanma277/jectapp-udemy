import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VehiculoService {

  totalVehiculos: number = 0;

  constructor(public http:HttpClient,
              public usuarioService:UsuarioService) { }


  cargarVehiculos(desde:number = 0){
    let url = URL_SERVICIOS + '/vehiculo?desde='+desde;
    return this.http.get(url)
               .map((resp:any)=> {
                this.totalVehiculos = resp.total;
                return resp.vehiculos;
               });

  }

  buscarVehiculos(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/vehiculos/'+termino;
    return this.http.get(url)
                .map((resp:any)=> resp.vehiculos);
     
   }


   borrarVehiculo(id: string){
    let url = URL_SERVICIOS + '/vehiculo/'+id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
               .map((resp:any) => swal('Vehiculo Eliminado', 'Vehiculo eliminado correctamente', 'success'));
  }

}
