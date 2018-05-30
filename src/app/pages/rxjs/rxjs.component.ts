import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subsription: Subscription;

  constructor() { 

     this.subsription =  this.regresaObservable().subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error', error),
      () => console.log('El observador termino')  
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    
    return new Observable(observer =>{

      let contador = 0;

    
      let intervalo = setInterval( () => {
        contador += 1;
        let salida = {
          valor: contador
        };
        
        observer.next( salida );

        /*if(contador === 3){
          clearInterval(intervalo);
          observer.complete();
        }

        if(contador === 5){
          clearInterval(intervalo);
          observer.error('Auxilio !');
        }*/
      }, 500);

    }).retry(2)
    .map((resp: any) => {
      return resp.valor;
    })
    .filter((valor, index)=>{
      if((valor % 2) === 1){
          return true;
      }else{
        return false;
      }
      
    });

  }

}
