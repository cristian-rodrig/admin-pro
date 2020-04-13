import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import {  Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ],
})
export class GraficoDonaComponent implements OnInit {

 @Input('ChartLabels') public ChartLabels: Label[] = [];
 @Input('ChartData') public ChartData: number [] = [];
 @Input('ChartType') public ChartType: ChartType = 'doughnut';
  @Input('ChartString') public ChartString: string []= [];

  constructor() { }

  ngOnInit(): void {
  }

}
