import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry,map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ],
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {    
    // this.regresaObservable().pipe( 
    //   retry(2) )           // Operador retry el 2 es nro de intentos

   this.subscription = this.regresaObservable()
    .subscribe( 
      numero => console.log('Subsc:', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador termino')
    );

  }


  ngOnInit(): void {
  }

  ngOnDestroy(){
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }




  regresaObservable(): Observable<any>{

    return new Observable( (observer: Subscriber<any>) =>{

      let contador = 0;

      let intervalo = setInterval( () => {
        
        contador +=1;

        const salida={
          valor: contador
        };

        observer.next( salida );

        // if (contador === 3){
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        
        // if( contador ===2){
        //   //clearInterval( intervalo );
        //   observer.error(contador);
        // }
        
      }, 1000);

    })
      .pipe(
        map( resp => resp.valor),
        filter( (valor, index) => { //filtrando solo los impares

          if ((valor % 2) !==0){ 
          // console.log(valor, index);
          return true;
          }else {
            return false;
          }
        })
      );   
    
  }


}
