import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService, UsuarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { STYLEMAP } from '../../config/config';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: [`agm-map {
    height: 600px;
  }`]
})
export class EmpresaComponent implements OnInit {

  empresa: Empresa[] = [];
  cargando: boolean = true;
  nombre: string ='';
  informacion: string ='';
  descripcion: string = '';
  img1:string;
  img2:string;
  img3:string;
  img4:string;
  lat: number = 0;
  lng: number = 0;
  lat_update: number = 0;
  lng_update: number = 0;
  zoom: number = 15;
  imagenSubir: File;
  imagenTemporal1: string;
  imagenTemporal2: string;
  imagenTemporal3: string;
  imagenTemporal4: string;

  styleArray: any;

  infoWindowOpened = null;
  

  constructor(public empresaService: EmpresaService, 
              public usuarioService: UsuarioService,
              public router: Router) {
                this.setCurrentPosition();
                this.styleArray = STYLEMAP;
               }

  ngOnInit() {

    this.cargarEmpresa(); 
  
  }

  placeMarker($event){
    this.lat_update = $event.coords.lat;
    this.lng_update = $event.coords.lng;
  }

  cargarEmpresa(){
    this.cargando = true;
    this.empresaService.obtenerEmpresa(this.usuarioService.usuario)
        .subscribe((resp:any) =>{
          this.empresa = resp.empresa;
          this.cargando = false;
          });
  }

  
  guardar(empresa: Empresa){
    this.empresaService.actualizarEmpresa(empresa)
        .subscribe(()=>this.cargarEmpresa());
  }

  actualizarUbicacion(id:number){
    this.empresaService.actualizarUbicacion(id, this.lat_update, this.lng_update)
        .subscribe(resp => {
          this.cargarEmpresa();
          this.lat_update = null;
          this.lng_update = null;
        });
  }

  crear(forma: NgForm){
    if( forma.invalid ){
      return;
    }
  

    if(this.lat_update === 0 || this.lng_update === 0){
      swal('Advertencia', 'Debes seleccionar la ubicación en el mapa', 'warning');
      return;
    }

    const empresa = new Empresa(
      null, 
      forma.value.nombre, 
      'BUSINESS', 
      forma.value.informacion, 
      forma.value.descripcion, 
      '',
      this.lat_update, 
      this.lng_update,
      null,
      null,
      null,
      null,
      this.usuarioService.usuario._id   
    );
    
    this.empresaService.crearEmpresa(empresa)
        .subscribe(resp => this.cargarEmpresa());

  }


  setCurrentPosition(){
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition((position)=>{
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;    
        this.zoom = 15;    
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
    this.empresaService.cambiarImagen(this.imagenSubir, id, imagen).then((resp)=>{
      if(resp){
        this.cargarEmpresa(); 
      }
    });
  }


}
