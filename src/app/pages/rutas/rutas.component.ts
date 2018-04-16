import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../models/ruta.model';
import { RutaService } from '../../services/ruta/ruta.service';
import { Title } from '@angular/platform-browser';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styles: []
})
export class RutasComponent implements OnInit {

  rutas: Ruta[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public rutaService:RutaService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarRutas();
    this.modalUploadService.notificacion
        .subscribe(()=> this.cargarRutas());
  }

  cargarRutas(){
    this.cargando = true;
    this.rutaService.cargarRutas(this.desde)
        .subscribe((resp:any) => {
          this.totalRegistros = resp.total;
          this.rutas = resp.rutas;
          this.cargando = false;
        });
  }

  guardarRuta(ruta: Ruta){
    this.cargando = true;
    this.rutaService.actualizarRuta(ruta)
        .subscribe(()=> this.cargando = false);
  }

  borrarRuta(ruta: Ruta){
    
    swal({
      title: '¿Esta seguro?',
      text: 'Estas a punto de eliminar la Ruta: '+ruta.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.rutaService.borrarRuta(ruta._id)
            .subscribe(borrado =>{
              this.cargarRutas();
            });
      } 
    });
  }

  crearRuta(){
    swal({
      title: 'Crear Ruta',
      text: 'Ingrese el nombre de la ruta',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true    
    }).then((valor:any) => {
      if(!valor || valor.length === 0){
        return;
      }

      this.rutaService.crearRuta(valor)
          .subscribe(()=> {
            swal('Ruta creada','La ruta '+valor+' ha sido creada', 'success');
            this.cargarRutas();
          });
    });
  }

  buscarRuta(termino: string){

    if(termino.length <= 0){
      this.cargarRutas();
      return;
    }
    this.cargando = true;

    this.rutaService.buscarRuta(termino)
        .subscribe((rutas:any) => {
          this.rutas = rutas;
          this.cargando = false;
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
    this.cargarRutas();

  }

  actualizarImagen(ruta: Ruta){
    this.modalUploadService.mostrarModal('Rutas', ruta._id);
  }

}
