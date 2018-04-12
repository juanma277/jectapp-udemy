import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;

  constructor( public usuarioService: UsuarioService) { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
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

    this.imagenSubir = archivo;
    
  }

  cambiarImagen(){
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
