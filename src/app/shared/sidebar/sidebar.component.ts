import { SidebarService } from '../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
   
  ],
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(public _sideBar: SidebarService,
              public _usuarioService : UsuarioService ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
