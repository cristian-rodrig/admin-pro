import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';





@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ],
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;


  @Input('nombre') leyenda : string=" Leyenda";
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValorProgress: EventEmitter<number> = new EventEmitter();



  constructor() { 
    //console.log('Leyenda', this.leyenda);
    console.log('Progreso' , this.progreso);
  }

  ngOnInit(): void {
   // console.log('Leyenda', this.leyenda);
   //console.log('Progreso' , this.progreso);

  }

  onChange(newValue: number){
    
    //let elemHTML : any = document.getElementsByName('progreso')[0];
    
    
    if(newValue >=100){
      this.progreso=100;
    }else if (newValue<=0){
      this.progreso=0;
    }else{
      this.progreso=newValue;
    }

    //elemHTML.value = this.progreso;
      this.txtProgress.nativeElement.value = this.progreso;

      this.cambioValorProgress.emit(this.progreso);

      this.txtProgress.nativeElement.focus();
    
  }


  cambiarValor(valor: number) {
    if (this.progreso <= 0 && valor <0) {
      this.progreso = 0;
      return;
    }
    if (this.progreso >= 100 && valor >0) {
       this.progreso = 100;
      return;
    } else {
      this.progreso += valor;

      this.cambioValorProgress.emit(this.progreso);
    }
  }

}
