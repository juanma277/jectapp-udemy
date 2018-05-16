import { Component, OnInit, NgZone } from '@angular/core';
import { BarriosService } from '../services/barrio/barrios.service';
import { Barrio } from '../models/barrio.model';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { RutaService } from '../services/ruta/ruta.service';
import { Ruta } from '../models/ruta.model';
import { MapsAPILoader } from '@agm/core';
import { Coordenada } from '../models/coordenada.model';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from '../services/empresa/empresa.service';
import { MarcadorService } from '../services/marcador/marcador.service';
import { Marcador } from '../models/marcador.model';
import { STYLEMAP } from '../config/config';


declare function init_plugins();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  myForm: FormGroup;
  styleArray: any;
 
  lat: number = 0;
  lng: number = 0;

  zoom: number;

  barrios: Barrio[] = [];
  barrioOrigen: Barrio[] = [];
  barrioDestino: Barrio[] = [];
  empresas: Empresa[] = [];
  marcadores: Marcador[] = [];

  rutas: Ruta[] = [];
  totalRegistros: number = 0;
  totalRutas: number = 0;
  cargando: boolean = false;
  resultado: boolean = false;
  
  mostrarRutas: boolean = false;
  show: boolean = false;
  data_origen: Coordenada[] = [];
  data_destino: Coordenada[] = [];
  
  lat_origen: number;
  lng_origen: number;
  lat_destino: number;
  lng_destino: number;

  dir = undefined;

  constructor(public barriosService: BarriosService,
              public rutasService: RutaService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private formBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private marcadorService: MarcadorService ) { 
      
      this.styleArray = STYLEMAP;
      this.setCurrentPosition();
      this.obtenerEmpresas();
      this.obtenerMarcadores();
  }

  ngOnInit() {
    init_plugins();
    this.initializeForm();
    this.cargarBarrios();
  }

  obtenerEmpresas(){
    this.empresaService.cargarEmpresasTodo().subscribe((resp:any)=>{
      this.empresas = resp.empresas;
    });
  }

  obtenerMarcadores(){
    this.marcadorService.cargarTodos().subscribe((resp:any)=>{
      this.marcadores = resp.marcadores;
    });
  }


  cargarBarrios(){
    this.barriosService.cargarBarrios()
        .subscribe(barrios => {
          this.totalRegistros = this.barriosService.totalBarrios;
          let barrioPrueba;
          for (let barrio of barrios ){
            //barrioPrueba = barrio.nombre + '*' + barrio.lat + '*' + barrio.lng;
            this.barrios.push(barrio.nombre); 
          }
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

  buscarRutas(forma: NgForm) {
     
    if( forma.value.origen === null || forma.value.destino === null ){
      swal('Error', 'Debes ingresar un origen y destino', 'warning');
      this.cargando = false; 
      this.totalRutas = 0; 
      this.rutas = [];  
      return;
    }

    if( forma.value.origen === forma.value.destino){
      swal('Error', 'Origen y Destino son iguales', 'warning');
      this.cargando = false; 
      this.totalRutas = 0;       
      this.rutas = [];           
      return;
    }

    const origen = forma.value.origen;
    const destino = forma.value.destino;
    
    this.cargando = true;
    this.mostrarRutas = false;
    this.zoom = 15;
    this.show = false;
    

    this.barriosService.buscarCoordenadasOrigen(origen)
        .subscribe(()=>{

          this.barriosService.buscarCoordenadasDestino(destino)
              .subscribe(()=>{
                this.barrioOrigen = this.barriosService.dataOrigen;
                this.barrioDestino = this.barriosService.dataDestino;

                if(this.barrioOrigen.length < 1 || this.barrioDestino.length < 1){
                  this.cargando = false;
                  this.resultado = false;
                  this.totalRutas = 0;                                              
                  this.rutas = []; 
                  swal('Advertencia', 'No se encontraron rutas con los filtros ingresados', 'warning');
                  return;
                }            

                for (let origen of this.barrioOrigen){
                  this.lat_origen = origen.lat;
                  this.lng_origen = origen.lng;
                }

                for (let destino of this.barrioDestino){
                  this.lat_destino = destino.lat;
                  this.lng_destino = destino.lng;
                }
                
                this.rutasService.buscarRutaOrigenDestino( this.lat_origen, this.lng_origen, this.lat_destino, this.lng_destino )
                      .subscribe((resp3:any)=>{
                        this.cargando = false;
                        this.totalRutas = resp3.total;
                        this.rutas =  resp3.rutas; 
                        this.cargando = false; 
                        this.resultado = true; 
                        if(this.totalRutas === 0 ){
                          this.resultado = false;                           
                          this.rutas = []; 
                          this.totalRutas = 0; 
                          swal('Advertencia', 'No se encontraron rutas con los filtros ingresados', 'warning');
                          return;
                        }      
                      });

              });
          
        });
  }

  mostrarRuta(lat_origen: number, lng_origen: number, lat_destino: number, lng_destino: number){
    
    this.mostrarRutas = true;
    this.show = true;

    this.lat_origen = lat_origen;
    this.lng_origen = lng_origen;
    this.lat_destino = lat_destino;
    this.lng_destino = lng_destino;

    this.zoom = 13;

    this.dir = {
      origin: { lat: this.lat_origen, lng: lng_origen },
      destination: { lat: this.lat_destino, lng: this.lng_destino }
    }

  }

  private initializeForm() {
    this.myForm = this.formBuilder.group({
      origen: '',
      destino: '',
    });

  }


  getDirection() {
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 }
    }
  }

}