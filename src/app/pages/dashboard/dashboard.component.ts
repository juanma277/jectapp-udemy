import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { URL_SERVICIOS } from '../../config/config';

import { Vehiculo } from '../../models/vehiculo.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`agm-map {
    height: 600px;
  }`]
})
export class DashboardComponent implements OnInit {

  lat: number = 2.446112;
  lng: number = -76.6060556;

  vehiculos: Vehiculo[] = [];

  constructor(private chatService: ChatService) { 
    this.sockeIo();
  }

  ngOnInit() {
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
      console.log(this.vehiculos);
  });


  }

}
