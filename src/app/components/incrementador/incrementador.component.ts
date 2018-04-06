import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

@Input() leyenda: string = 'Leyenda';
@Input() progreso: number = 50;

@Output() cambioValor: EventEmitter<number> = new EventEmitter (); 
constructor() {
  console.log('LEYENDA', this.leyenda);
  console.log('PROGRESO', this.progreso);
 }

ngOnInit() {
}

onChanges(valor: number){

  //let elemHTML:any = document.getElementsByName('progreso')[0];

  if(valor >= 100){
    this.progreso = 100;    
  }else if(valor <= 0){
    this.progreso = 0;
  }else{
    this.progreso = valor;
  }
  //element.value = this.progreso;
  this.cambioValor.emit(this.progreso);
}

cambiarValor( valor: number){
  if((this.progreso >= 100) && (valor > 0)){
    this.progreso = 100;
    return;
  }

  if((this.progreso <= 0) && (valor < 0)){
    this.progreso = 0;
    return;
  }
  this.progreso = this.progreso + valor;
  this.cambioValor.emit(this.progreso);
}

}