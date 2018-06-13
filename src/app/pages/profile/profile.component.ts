import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  forma: FormGroup;

  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;

  constructor( public usuarioService: UsuarioService,
                public router: Router) { 
    this.usuario = this.usuarioService.usuario;
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

  ngOnInit() {
    this.forma = new FormGroup({
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    }, { validators: this.validarIguales('password', 'password2')});

  }

  guardar(usuario: Usuario){

    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email = usuario.email; 
    }
    
    
    this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe();

  }

  seleccionImage(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      swal('Error en archivo', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;     
      return; 
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;

    
  }

  cambiarImagen(){
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

  cambiarPassword(){
    if(this.forma.invalid){
      return;
    }

    let password = this.forma.value.password;
    let user_id = this.usuarioService.usuario._id;

    this.usuarioService.cambiarPassword(user_id, password)
        .subscribe( respuesta => this.router.navigate(['/perfil']));
  }

}
