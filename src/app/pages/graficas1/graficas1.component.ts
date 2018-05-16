import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  graficos: any = {
    'grafico1': {
      'labels': ['Activos', 'Inactivos'],
      'data':  [30, 2],
      'type': 'doughnut',
      'leyenda': 'Usuarios Registrados'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [65, 35],
      'type': 'doughnut',
      'leyenda': '¿Le gusta el transporte público de Popayán?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [5, 95],
      'type': 'doughnut',
      'leyenda': '¿Le gustaría un cambio en el sistema de transporte público?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
