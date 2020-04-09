import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { NgModule } from '@angular/core';
import { PageModule } from'./pages/pages.module'


//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


//Rutas
import { APP_ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    ],
  imports: [
    BrowserModule,
    PageModule,    
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
