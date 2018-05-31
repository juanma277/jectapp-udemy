import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { URL_SERVICIOS, STYLEMAP } from '../../config/config';

import { Vehiculo } from '../../models/vehiculo.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Empresa } from '../../models/empresa.model';
import { MarcadorService } from '../../services/marcador/marcador.service';
import { Marcador } from '../../models/marcador.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`agm-map {
    height: 800px;
  }`]
})
export class DashboardComponent implements OnInit {

  lat: number = 2.446112;
  lng: number = -76.6060556;

  marcadores: Marcador[] = [];
  vehiculos: Vehiculo[] = [];
  empresas: Empresa[] = [];
  zoom:number = 15;

  styleArray: any;

  constructor(//private chatService: ChatService,
              private empresaService: EmpresaService,
              private marcadorService: MarcadorService) { 
    
    this.styleArray = STYLEMAP;
    //this.sockeIo();
    this.obtenerEmpresas();
    this.obtenerMarcadores();

  }

  ngOnInit() {
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

  sockeIo(){
    const socket = io.connect( URL_SERVICIOS );

    // ENVIAR INFORMACION
    socket.emit('obtenerVehiculos',{
      empresa: 'Sotracauca',
    });
    
    //RECIBIR INFORMACION 
    socket.on('obtenerVehiculos', function(data){
      this.vehiculos = data;
  });


  }

}
