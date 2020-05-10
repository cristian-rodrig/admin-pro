import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ],
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean=true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe(resp => this.cargarUsuarios())
  }

  mostrarModal( id: string){
    this._modalUploadService.mostrarModal( 'usuarios', id);
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
            .subscribe((resp:any) =>{

              this.totalRegistros=resp.totalUsuarios;
             
              this.usuarios= resp.usuarios;
              this.cargando = false;
            });
  }

  cambiarDesde(valor: number){
    
    let desde = this.desde + valor;
    console.log(desde);

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  //busqueda input usuarios
  buscarUsuarios (termino: string){
   
    if(termino.length <= 1){
      this.cargarUsuarios();
      return;
    }

    this.cargando=true;
    this._usuarioService.buscarUsuarios(termino)
          .subscribe( (usuarios : Usuario[]) =>{
            
            this.usuarios = usuarios;
            this.cargando= false;
          });

  }

  borrarUsuario(usuario: Usuario){

    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No puede borrar usuario',
                'no se puede borrar a si mismo',
                 'error');
      return;
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: "una vez confirmado no se podra recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {

        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe( resp=>{
            console.log(resp);

            this.cargarUsuarios();

            Swal.fire(
              'Borrrado!',
              'El usuario '+usuario.nombre +' ha sido eliminado correctamente.',
              'success'
            )
            return true;
        });

      }
    })
  } 


  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
          .subscribe(resp =>{
            console.log(resp);
            Swal.fire(
              usuario.nombre,
              'Ha sido actualizado correctamente.',
              'success'
            )
            return true;          
          });
  }
}
