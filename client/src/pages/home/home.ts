import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PreferComponent } from '../prefer/prefer.component';

import { LoginPage } from '../login/login.component';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  preferComponent = PreferComponent;

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('User').then((val) => {
      console.log('Your age is', val);
      if (!val)
        this.navCtrl.push(LoginPage);
    });

  }

}
