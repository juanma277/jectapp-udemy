import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class VehiculoService {

  totalVehiculos: number = 0;

  constructor(public http:HttpClient) { }


  cargarVehiculos(){
    let url = URL_SERVICIOS + '/vehiculo';
    return this.http.get(url)
               .map((resp:any)=> {
                 this.totalVehiculos = resp.total;
                return resp.vehiculos;
               });

  }

  obtenerVehiculo(id: string){

  }

}
