import { Component } from '@angular/core';
import { routerTransition } from './helpers/animations/animations.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]

})
export class AppComponent {


  constructor( ) {}

}
