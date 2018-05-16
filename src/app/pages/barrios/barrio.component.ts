import { Component, OnInit } from '@angular/core';
import { Barrio } from '../../models/barrio.model';
import { BarriosService } from '../../services/barrio/barrios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { STYLEMAP } from '../../config/config';

@Component({
  selector: 'app-barrio',
  templateUrl: './barrio.component.html',
  styles: [`agm-map {
    height: 600px;
  }`]
})
export class BarrioComponent implements OnInit {

  barrios: Barrio[] = [];
  barrio: Barrio = new Barrio('');
  textoAccion: string = 'crear un barrio';
  lat_update: number = 0;
  lng_update: number = 0;
  boton:string = 'CREAR';

  styleArray: any;


  constructor(public barriosService: BarriosService,
              public router: Router,
              public activatedRoute: ActivatedRoute ) { 

                this.styleArray = STYLEMAP;

                activatedRoute.params.subscribe(params =>{
                  let id = params['id'];
                  if(id !== 'nuevo'){
                    this.cargarBarrio(id);
                    this.textoAccion = 'editar los datos del barrio';
                    this.boton = 'ACTUALIZAR';
                  }else{
                    this.setCurrentPosition();
                  }
                });

              }

  ngOnInit() { }

  cargarBarrio(id: string){
    this.barriosService.cargarBarrio(id)
        .subscribe(barrio => {
          this.barrio = barrio;
        });
  }

  placeMarker($event){
    this.lat_update = $event.coords.lat;
    this.lng_update = $event.coords.lng;   

  }


  setCurrentPosition(){
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition((position)=>{
        this.barrio.lat = position.coords.latitude;
        this.barrio.lng = position.coords.longitude;    
      });
    }

  }
  
  guardarBarrio(barrio: Barrio){
    if(this.lat_update === 0 || this.lng_update === 0){
      this.barriosService.actualizarBarrioNombre(barrio, this.barrio.lat, this.barrio.lng)
        .subscribe((resp)=>{
          this.router.navigate(['/barrios']);
        });
    }else{

      this.barriosService.actualizarBarrioNombreCoordenadas(barrio, this.lat_update, this.lng_update)
      .subscribe((resp)=>{
        this.lat_update = 0;
        this.lng_update = 0;
        this.router.navigate(['/barrios']);
        
      });

    }
    
  }

}
