import { Hospital } from './../../models/hospital.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../service.index';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number=0; 

  constructor(public http: HttpClient,
              public _subirArchivoService: SubirArchivoService,
              public _usuarioService: UsuarioService) { }

         
    cargarHospitales(){
      let url = URL_SERVICIOS + '/hospital';  
      return this.http.get(url)
        .map ((resp:any) =>{ 

          this.totalHospitales=resp.total;
           return resp.hospitales;
    });
  }

    obtenerhospital(id: string){
      let url = URL_SERVICIOS + '/hospital/' + id;  
      return this.http.get(url)
            .map( (resp: any) => resp.hospital);
   }


   borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id ;  
    url += '?token=' + this._usuarioService.token;
    
    return this.http.delete(url)
        .map( resp => Swal.fire('Hospital Borrado', 'Eliminado Correctamente', 'success')); 
   }

   crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url , {nombre})
          .map((resp:any) => resp.hospital);
   }


   buscarHospital( termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
        .map((resp:any) => resp.hospitales);        
  }

  actualizarHospital( hospital: Hospital){
     
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
        
    return this.http.put(url, hospital )
          .map( (resp:any) => resp.hospital);
      
   }
}
