import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/service.index';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styles: []
})
export class VehiculosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];

  constructor( public vehiculoService: VehiculoService ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarVehiculo(){

  }

  cargarMedicos(){
    this.vehiculoService.cargarVehiculos()
        .subscribe(vehiculos => this.vehiculos = vehiculos);
  }

  actualizarImagen(){

  }

  obtenerVehiculo(id: string){

  }

  editarVehiculo(){

  }

  borrarVehiculo(){

  }

  cambiarDesde(){
    
  }

  

}
