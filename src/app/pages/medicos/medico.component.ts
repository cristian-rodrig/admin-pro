import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService : ModalUploadService
  ) {
    activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  hospitales: Hospital[] = [];

  
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  ngOnInit(): void {
    this._hospitalService
      .cargarHospitales()
      .subscribe((hospitales) => (this.hospitales = hospitales));

      this._modalUploadService.notificacion
          .subscribe( resp =>{
            this.medico.img= resp.medico.img;
          });
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe((medico) => {
      this.medico._id = medico._id;
      this.router.navigate(['medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this._hospitalService
      .obtenerhospital(id)
      .subscribe((hospital) => (this.hospital = hospital));
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
    .subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto(){

    this._modalUploadService.mostrarModal('medicos', this.medico._id)
  }


  
}
