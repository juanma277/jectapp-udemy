import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta/ruta.service';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Ruta } from '../../models/ruta.model';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { nullSafeIsEquivalent, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { STYLEMAP } from '../../config/config';
import { Barrio } from '../../models/barrio.model';
import { BarriosService } from '../../services/service.index';
import { BarrioInterface } from '../../interfaces/barrio';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


declare var swal:any;

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styles: [`agm-map {
    height: 600px;
  }`]
})
export class RutaComponent implements OnInit {


  //FORMULARIO
  rForm: FormGroup;

  empresas: Empresa[] = [];
  barrios: Barrio[] = [];
  barriosPrueba: Barrio[] = [];
  ruta: Ruta = new Ruta('', '', null, null, null, null, '');
  empresa: Empresa = new Empresa('','', '', '', '', '');
  textoAccion: string = 'crear una Ruta';
  lat: number;
  lng: number;
  zoom: number = 15;
  lat_origen:number;
  lng_origen:number;
  lat_destino:number;
  lng_destino:number;
  styleArray: any;
  rutaBaariosArray: Array<string> = [];
  barriosArray: Barrio[] = [];
  barriosList: Barrio[] = [];  
  barriosArrayNew: Barrio[] = [];
  nombresBarrios: Array<any> = [];
  checked: any[] =[];
  arraySelects = new Object();
  BarriosFinal: Array<String> = [];
  
  adicion:boolean = false;
  

  constructor(public rutaService: RutaService,
              public empresaService: EmpresaService,
              public vehiculoService: VehiculoService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService,
              public barrioService: BarriosService,
              private fb:FormBuilder) {
                
                this.styleArray = STYLEMAP;

                this.ruta.empresa = '';
                this.ruta.barrios = '';
                
                this.setCurrentPosition();
    
                activatedRoute.params.subscribe(params =>{
                  let id = params['id'];
                  if(id !== 'nuevo'){
                    this.cargarRuta(id);
                    this.textoAccion = 'editar los datos de la Ruta';
                  }else{
                    this.adicion = true;
                    this.barrioService.cargarBarrios()
                      .subscribe((resp:any)=>{
                        this.barriosArray = resp;
                      });
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
          this.ruta.barrios = ruta.barrios;
          //JSON.stringify(this.ruta.barrios);
          this.rutaBaariosArray = ((ruta.barrios).split(","));
          this.lat_origen = ruta.lat_origen;
          this.lng_origen = ruta.lng_origen;
          this.lat_destino = ruta.lat_destino;
          this.lng_destino = ruta.lng_destino;

          this.barrioService.cargarBarrios()
              .subscribe((resp:any)=>{
                this.barrios =resp;
                for(let data1 of this.barrios){
                  let bandera = 0;
                  for(let data2 of this.rutaBaariosArray){
                      if(data1.nombre === data2){
                        const barrio = new Barrio (data1.nombre, data1.lat, data1.lng, data1._id, true);
                        this.barriosArray.push(barrio);
                        bandera = 1;
                      }
                  }
                  if (bandera == 0) {
                    const barrio = new Barrio (data1.nombre, data1.lat, data1.lng, data1._id, false);
                    this.barriosArray.push(barrio);
                  }
                }

              });

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

  modificarBarrios(){
    this.adicion = true;
  }

  guardarRuta(forma: NgForm){

    let arrayBarrioFinal = new Object();
    
    for(let inicial of this.rutaBaariosArray) {
      if (typeof this.arraySelects[inicial] == 'undefined') {
        arrayBarrioFinal[inicial] = true;
      } else if (this.arraySelects[inicial] == true) {
        arrayBarrioFinal[inicial] = true;
      }
    }

    for(var clave in this.arraySelects) {
      if (this.arraySelects[clave] == true) {
        arrayBarrioFinal[clave] = this.arraySelects[clave];
      }
    }

    for (let clave in arrayBarrioFinal) {
      this.BarriosFinal.push(clave);      
    }

    this.rutaService.guardarRuta(this.ruta, this.BarriosFinal)
      .subscribe(ruta=>{
        this.ruta._id = ruta._id;
        this.router.navigate(['/rutas']);
      });
    
  }

  updateList($event) {

    if (this.checked.length == 0) {
      this.arraySelects[$event.path[0].id] = $event.srcElement.checked;
    } else {
      for(var clave in this.arraySelects) {
        if (typeof this.arraySelects[clave] !== 'undefined') {
          this.arraySelects[$event.path[0].id] = $event.srcElement.checked;
        }
      }
    }

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
    this.rutaService.actualizarCoordenadas(this.ruta, this.lat_origen, this.lng_origen, this.lat_destino, this.lng_destino)
        .subscribe();    
  }


}