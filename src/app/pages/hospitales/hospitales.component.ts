import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
declare var swal :any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: [],
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  totalRegistros: number = 0;
  
  
  

  constructor(
    public hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {   
    this.hospitalService.cargarHospitales()
        .subscribe(hospitales => this.hospitales = hospitales );     
  }

  //busqueda input hospital
  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    
    this.hospitalService
      .buscarHospital(termino)
      .subscribe( hospitales => this.hospitales = hospitales);
        
      }
  


  borrarHospital(hospital: Hospital) {
 
    this.hospitalService.borrarHospital(hospital._id)
    .subscribe((resp) => {
      console.log(resp);

      this.cargarHospitales();

      Swal.fire(
        'Borrrado!',
        'El hospital ' + hospital.nombre + ' ha sido eliminado correctamente.',
        'success'
      );
      return true;
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital)
    .subscribe((resp) => {
      console.log(resp);
      Swal.fire(
        hospital.nombre,
        'Ha sido actualizado correctamente.',
        'success'
      );
      return resp.hospital;
    });
  }

 
  crearHospital() {

    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((valor) => {
      if ( !valor.value || valor.value.length === 0) {
        return;
      }
 
      this.hospitalService.crearHospital( valor.value )
            .subscribe( () => this.cargarHospitales());
    });
 
  }

  actualizarImagen(hospital: Hospital){

    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}
