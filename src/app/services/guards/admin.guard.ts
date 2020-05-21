import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService : UsuarioService,
              public router : Router)
              { }
  

  canActivate(){

    if( this._usuarioService.usuario.role ==='ADMIN-ROLE'){
      return true;
    }else{
      console.log('Bloqueado por el ADMIN GUARD');
      this.router.navigate(['/login']);
      this._usuarioService.logout();
      return false;
    }

    

  }
  
}
