import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single, multi } from '../assets/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  single: any[];
  multi: any[];
  label: string = "Taste in music"; 
  gradient: boolean;
  
  view: any[] = [];

  colorScheme = {
    domain: ['#96C7D7', '#E3AE3C', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, {single, multi})   
  }
  
  onSelect(event) {
    console.log(event);
  }
}
