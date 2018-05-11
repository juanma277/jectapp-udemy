import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
              public router: Router){

  }
  canActivate() {

    if(this.usuarioService.usuario.role === 'ADMIN_ROLE' || this.usuarioService.usuario.role === 'SUPER_ROLE' ){
      return true;
    }else{
      this.router.navigate(['/dashboard']);
      return false;
    }
  
  }
}
