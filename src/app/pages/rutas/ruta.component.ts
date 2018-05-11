import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta/ruta.service';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { NgForm } from '@angular/forms';
import { Ruta } from '../../models/ruta.model';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styles: [`agm-map {
    height: 600px;
  }`]
})
export class RutaComponent implements OnInit {

  empresas: Empresa[] = [];
  ruta: Ruta = new Ruta('', '', null, null, null, null, '');
  empresa: Empresa = new Empresa('','', '', '', '');
  textoAccion: string = 'crear una Ruta';
  lat: number;
  lng: number;
  zoom: number;
  lat_origen:number;
  lng_origen:number;
  lat_destino:number;
  lng_destino:number;
 

  constructor(public rutaService: RutaService,
              public empresaService: EmpresaService,
              public vehiculoService: VehiculoService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) { 

                this.ruta.empresa = '';
                this.setCurrentPosition();
    
                activatedRoute.params.subscribe(params =>{
                  let id = params['id'];
                  if(id !== 'nuevo'){
                    this.cargarRuta(id);
                    this.textoAccion = 'editar los datos de la Ruta';
                  }
                });


              }

  ngOnInit() {
    this.empresaService.cargarEmpresasAll()
        .subscribe((resp:any)=>{
          this.empresas = resp.empresas;
        });
        
    this.modalUploadService.notificacion
        .subscribe(resp =>{
          this.ruta.img = resp.ruta.img;
        });
  }

  placeMarkerOrigen($event){
    this.lat_origen = $event.coords.lat;
    this.lng_origen = $event.coords.lng;
  }

  placeMarkerDestino($event){
    this.lat_destino = $event.coords.lat;
    this.lng_destino = $event.coords.lng;
  }
  

  cargarRuta(id: string){
    this.rutaService.obtenerRuta(id)
        .subscribe(ruta => {
          this.ruta = ruta;
          this.ruta.empresa = ruta.empresa._id;
          this.cambioEmpresa(this.ruta.empresa);
        });
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
  

  guardarRuta(forma: NgForm){
    if(forma.invalid){
      return;
    }

    this.rutaService.guardarRuta(this.ruta)
        .subscribe(ruta=>{
          this.ruta._id = ruta._id;
          this.router.navigate(['/ruta', ruta._id]);
        });
    
  }

  cambiarFoto(){
    this.modalUploadService.mostrarModal('Rutas', this.ruta._id);
  }

  cambioEmpresa(id: string){
    if(id === ''){
      return;
    }
    this.empresaService.cargarEmpresa(id)
        .subscribe(empresa=> this.empresa = empresa);
  }


  ActualizarCoordenadas(){
    console.log("AQUI VOY");
  }
 

}
