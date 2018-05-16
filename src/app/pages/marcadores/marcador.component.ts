import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { MarcadorService } from '../../services/marcador/marcador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Marcador } from '../../models/marcador.model';
import { STYLEMAP } from '../../config/config';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styles: [`agm-map {
    height: 600px;
  }`]
})
export class MarcadorComponent implements OnInit {

  marcadores: Marcador[] = [];
  marcador: Marcador = new Marcador('','','', null, null ,'');
  textoAccion: string = 'crear un Marcador';
  lat_update: number = 0;
  lng_update: number = 0;
  boton:string = 'CREAR';

  imagenSubir: File;
  imagenTemporal1: string;
  imagenTemporal2: string;
  imagenTemporal3: string;
  imagenTemporal4: string;
  styleArray: any;

  constructor(public marcadorService: MarcadorService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {

                this.styleArray = STYLEMAP;

                activatedRoute.params.subscribe(params =>{
                  let id = params['id'];
                  if(id !== 'nuevo'){
                    this.cargarMarcador(id);
                    this.textoAccion = 'editar los datos del Marcador.';
                    this.boton = 'ACTUALIZAR';
                  }else{
                    this.setCurrentPosition();
                  }
                });
               }

  ngOnInit() {
  }

  cargarMarcador(id: string){
    this.marcadorService.cargarMarcador(id)
        .subscribe(marcador => {
          this.marcador = marcador;
        });
  }

  setCurrentPosition(){
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition((position)=>{
        this.marcador.lat = position.coords.latitude;
        this.marcador.lng = position.coords.longitude;    
      });
    }

  }

  placeMarker($event){
    this.lat_update = $event.coords.lat;
    this.lng_update = $event.coords.lng;   
  }


  guardarMarcador(marcador: Marcador){
    if(this.lat_update === 0 || this.lng_update === 0){
          if(this.boton === 'ACTUALIZAR'){
    
            this.marcadorService.actualizarMarcador(marcador, marcador.lat, marcador.lng)
            .subscribe((resp)=>{
              this.router.navigate(['/marcador/'+resp._id]);
            });
    
          }else{
    
            this.marcadorService.actualizarMarcador(marcador, marcador.lat, marcador.lng)
            .subscribe((resp)=>{
              this.router.navigate(['/marcador/'+resp._id]);
            });
    
          }
      
    }else{
      
      this.marcadorService.actualizarMarcador(marcador , this.lat_update, this.lng_update)
      .subscribe((resp)=>{
        this.router.navigate(['/marcador/'+resp._id]);        
      });

    }
    }


    seleccionImage(archivo: File, imagen:number){

      if(!archivo){
        this.imagenSubir = null;
        return;
      }
  
      if(archivo.type.indexOf('image') < 0){
        swal('Error en archivo', 'El archivo seleccionado no es una imagen', 'error');
        this.imagenSubir = null;     
        return; 
      }
  
      this.imagenSubir = archivo;
  
      const reader = new FileReader();
      const urlImagenTemp = reader.readAsDataURL(archivo);
  
  
      if(imagen === 1){
        reader.onloadend = () => this.imagenTemporal1 = reader.result;
      }
      if(imagen === 2){
        reader.onloadend = () => this.imagenTemporal2 = reader.result;
      }
      if(imagen === 3){
        reader.onloadend = () => this.imagenTemporal3 = reader.result;
      }
      if(imagen === 4){
        reader.onloadend = () => this.imagenTemporal4 = reader.result;
      }
  
      
      
    }
  
    cambiarImagen(id:string, imagen:number){
      this.marcadorService.cambiarImagen(this.imagenSubir, id, imagen).then((resp)=>{
        if(resp){
          this.cargarMarcador(resp._id); 
        }
      });
    }
  


}
