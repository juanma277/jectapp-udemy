import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  role:string;

  constructor(public usuarioService: UsuarioService,
              public modalUploadService: ModalUploadService) { 

                this.role = this.usuarioService.usuario.role;
              }

  ngOnInit() {
    this.cargarUsuarios(); 

    this.modalUploadService.notificacion
        .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
        .subscribe((resp:any) =>{
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
          });
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this.usuarioService.buscarUsuario(termino)
        .subscribe((usuarios:any)=>{
          this.usuarios = usuarios;
          this.cargando = false;
          
        });
  }

  borrarUsuario(usuario: Usuario){
    if(usuario._id === this.usuarioService.usuario._id){
      swal('Error, al eliminar usuario', 'No se puede borrar el usuario logueado', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Estas a punto de eliminar el usuario: '+usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado =>{
              this.cargarUsuarios();
            });
      } 
    });
  }

  guardarUsuario(usuario: Usuario){
    this.usuarioService.actualizarUsuario(usuario)
        .subscribe();
  }

  mostrarModal(id: string){
    this.modalUploadService.mostrarModal('Usuarios', id);
  }

  resetPassword(usuario: Usuario){

    swal({
      title: '¿Esta seguro?',
      text: 'Estas a punto de resetear la contraseña de: '+usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.usuarioService.resetPassword(usuario._id)
            .subscribe(reset =>{
              this.cargarUsuarios();
            });
      } 
    });

  }

}
