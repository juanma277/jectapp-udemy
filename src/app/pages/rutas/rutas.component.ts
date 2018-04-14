import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../models/ruta.model';
import { RutaService } from '../../services/ruta/ruta.service';

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

  constructor(public rutaService:RutaService) { }

  ngOnInit() {
    this.cargarRutas();
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
  }

  borrarRuta(ruta: Ruta){
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

}
