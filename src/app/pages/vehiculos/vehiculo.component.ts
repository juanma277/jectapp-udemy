import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ruta } from '../../models/ruta.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { RutaService } from '../../services/ruta/ruta.service';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styles: []
})
export class VehiculoComponent implements OnInit {

  rutas: Ruta[] = [];
  vehiculo: Vehiculo = new Vehiculo('','','','','');
  ruta: Ruta = new Ruta('', '', null, null, null, null, '');
  textoAccion: string = 'crear un vehiculo';

  constructor(public rutaService: RutaService,
              public vehiculoService: VehiculoService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) { 
    
                activatedRoute.params.subscribe(params =>{
                  let id = params['id'];
                  if(id !== 'nuevo'){
                    this.cargarVehiculo(id);
                    this.textoAccion = 'editar los datos del vehiculo';
                  }
                });


              }

  ngOnInit() {
    this.rutaService.cargarRutasAll()
        .subscribe((resp:any)=>{
          this.rutas = resp.rutas;
        });
    this.modalUploadService.notificacion
        .subscribe(resp =>{
          this.vehiculo.img = resp.vehiculo.img;
        });
  }

  cargarVehiculo(id: string){
    this.vehiculoService.cargarVehiculo(id)
        .subscribe(vehiculo => {
          this.vehiculo = vehiculo;
          this.vehiculo.ruta = vehiculo.ruta._id;
          this.cambioRuta(this.vehiculo.ruta);
        });
  }

  guardarVehiculo(forma: NgForm){
    if(forma.invalid){
      return;
    }

    this.vehiculoService.guardarVehiculo(this.vehiculo)
        .subscribe(vehiculo=>{
          this.vehiculo._id = vehiculo._id;
          this.router.navigate(['/vehiculo', vehiculo._id]);
        });
    
  }

  cambiarFoto(){
    this.modalUploadService.mostrarModal('Vehiculos', this.vehiculo._id);
  }

  cambioRuta(id: string){
    if(id === ''){
      return;
    }
    this.rutaService.obtenerRuta(id)
        .subscribe(ruta=> this.ruta = ruta);
  }
 
}
