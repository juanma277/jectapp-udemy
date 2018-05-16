import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../models/marcador.model';
import { MarcadorService } from '../../services/marcador/marcador.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: []
})
export class MarcadoresComponent implements OnInit {

  marcadores: Marcador[] = [];
  totalRegistros: number = 0;
  desde: number = 0;
  cargando: boolean = true;

  constructor( public marcadorService: MarcadorService,
               public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMarcadores();
    this.modalUploadService.notificacion
        .subscribe(()=> this.cargarMarcadores());
  }


  cargarMarcadores(){
    this.marcadorService.cargarMarcadores(this.desde)
        .subscribe(marcadores => {
          this.marcadores = marcadores;
          this.totalRegistros = this.marcadorService.totalMarcadores;
          this.cargando = false;
        });
  }

  buscarMarcador(termino: string){

    if(termino.length <= 0){
      this.cargarMarcadores();
      return;
    }
    this.cargando = true;

    this.marcadorService.buscarMarcador(termino)
        .subscribe((marcadores:any) => {
          this.marcadores = marcadores;
          this.cargando = false;
        });

  }

  guardarMarcador(marcador: Marcador){
    this.cargando = true;
    this.marcadorService.actualizarMarcador(marcador, marcador.lat, marcador.lng)
        .subscribe(()=> this.cargando = false);
  }

  borrarMarcador(marcador: Marcador){
    
    swal({
      title: '¿Esta seguro?',
      text: 'Estas a punto de eliminar el Marcador: '+marcador.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.marcadorService.borrarMarcador(marcador._id)
            .subscribe(borrado =>{
              this.cargarMarcadores();
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
    this.cargarMarcadores();

  }

}
