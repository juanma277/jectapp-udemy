import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ruta } from '../../models/ruta.model';
import { RutaService } from '../../services/ruta/ruta.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styles: []
})
export class VehiculoComponent implements OnInit {

  rutas: Ruta[] = [];

  constructor(public rutaService: RutaService) { }

  ngOnInit() {
    this.rutaService.cargarRutas()
        .subscribe((resp:any)=>{
          this.rutas = resp.rutas;
        });
  }

  guardarMedico(forma: NgForm){
    console.log(forma.valid);
    console.log(forma.value);
    
  }

}
