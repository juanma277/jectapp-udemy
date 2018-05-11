import { Component, OnInit } from '@angular/core';
import { Barrio } from '../../models/barrio.model';
import { BarriosService } from '../../services/barrio/barrios.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-barrios',
  templateUrl: './barrios.component.html',
})
export class BarriosComponent implements OnInit {

  barrios: Barrio[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public barriosService: BarriosService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarBarrios(); 
  }

  cargarBarrios(){
    this.cargando = true;
    this.barriosService.cargarBarriosPaginados(this.desde)
        .subscribe((resp:any) =>{
          this.totalRegistros = resp.total;
          this.barrios = resp.barrios;
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
    this.cargarBarrios();

  }

  guardarBarrio(barrio: Barrio){
    this.cargando = true;
    this.barriosService.actualizarBarrio(barrio)
        .subscribe(()=> this.cargando = false);
  }

  borrarBarrio(barrio: Barrio){
    
    swal({
      title: '¿Esta seguro?',
      text: 'Estas a punto de eliminar la Ruta: '+barrio.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.barriosService.borrarBarrio(barrio._id)
            .subscribe(borrado =>{
              this.cargarBarrios();
            });
      } 
    });
  }

  buscarBarrio(termino: string){
    if(termino.length <= 0){
      this.cargarBarrios();
      return;
    }
    this.cargando = true;

    this.barriosService.buscarBarrio(termino)
        .subscribe((barrios:any)=>{
          this.barrios = barrios;
          this.cargando = false;
        });
  }

}
