import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PreferComponent } from '../prefer/prefer.component';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  preferComponent = PreferComponent;

  constructor(public navCtrl: NavController) {

  }

}
