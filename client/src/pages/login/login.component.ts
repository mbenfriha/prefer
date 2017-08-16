import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PreferComponent } from '../prefer/prefer.component';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {

  preferComponent = PreferComponent;
  registerCredentials = { email: '', password: '' };

  constructor(public nav: NavController, private storage: Storage) {

  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    console.log(this.registerCredentials)
    this.storage.set('User', JSON.stringify(this.registerCredentials));
    this.nav.setRoot(HomePage);

  }

}
