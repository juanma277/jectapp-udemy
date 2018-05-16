import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styles: []
})
export class VehiculosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  totalRegistros: number = 0;
  desde: number = 0;

  constructor( public vehiculoService: VehiculoService,
    public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarVehiculos();
    this.modalUploadService.notificacion
        .subscribe(()=> this.cargarVehiculos());
  }

  buscarVehiculo(termino: string){

    if(termino.length <= 0){
      this.cargarVehiculos();
      return;
    }
    this.vehiculoService.buscarVehiculos(termino)
        .subscribe(vehiculos => this.vehiculos =vehiculos);    
  }

  cargarVehiculos(){
    this.vehiculoService.cargarVehiculos(this.desde)
        .subscribe(vehiculos => {
          this.vehiculos = vehiculos;
          this.totalRegistros = this.vehiculoService.totalVehiculos;
        });
  }

  actualizarImagen(vehiculo: Vehiculo){
    this.modalUploadService.mostrarModal('Vehiculos', vehiculo._id);
  }

  obtenerVehiculo(id: string){

  }

  borrarVehiculo(vehiculo: Vehiculo){
    swal({
      title: '¿Esta seguro?',
      text: 'Estas a punto de eliminar el Vehiculo: '+vehiculo.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.vehiculoService.borrarVehiculo(vehiculo._id)
            .subscribe(() =>{
              this.cargarVehiculos();
            });
      } 
    });    
  }

  cambiarDesde(valor: number){

    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarVehiculos();
  }

  crearVehiculo(){

  }

  

}
