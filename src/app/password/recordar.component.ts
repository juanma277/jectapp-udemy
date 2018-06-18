import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-recordar',
  templateUrl: './recordar.component.html',
  styleUrls: ['./recordar.component.css']
})
export class RecordarComponent implements OnInit {

  forma: FormGroup;
  user_id:string = '';

  constructor(public usuarioService: UsuarioService,
              public activatedRoute: ActivatedRoute,
              public router: Router) { 

        activatedRoute.params.subscribe(params =>{
          this.user_id = params['id'];
        });
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    }, { validators: this.validarIguales('password', 'password2')});
  }

  validarIguales(campo1: string, campo2: string){
    return (group: FormGroup) =>{
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if( pass1 === pass2 ){
        return null;
      }
        return {
          sonIguales: true
        };
    };
  }

  cambiarPassword(){
    if(this.forma.invalid){
      return;
    }
      this.usuarioService.recoverPassword(this.user_id, this.forma.value.password)
        .subscribe( respuesta => this.router.navigate(['/login']));
  }

}
