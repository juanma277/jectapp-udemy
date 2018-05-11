import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  forma: FormGroup;

  constructor( public usuarioService: UsuarioService,
               public router: Router) { }

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

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required )
    }, { validators: this.validarIguales('password', 'password2')});

    this.forma.setValue({
      nombre:  '',
      email: '',
      password: '',
      password2: '',
      role:''
    });
  }

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      '',
      this.forma.value.role  
    );

    this.usuarioService.crearUsuario(usuario)
        .subscribe( respuesta => this.router.navigate(['/usuarios']));
  }

}
