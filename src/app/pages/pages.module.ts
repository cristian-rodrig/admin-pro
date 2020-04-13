import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';
import {FormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

//ng2 charts
import { ChartsModule } from 'ng2-charts';


//pagescomponent
import { PagesComponent } from './pages.component';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],

    imports: [
         CommonModule,
         SharedModule,
         PAGES_ROUTES,
         FormsModule,
         ChartsModule
    ],

    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
        

    ],
    providers: [],
})
export class PageModule {}