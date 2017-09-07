import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PreferComponent } from '../prefer/prefer.component';
import { HomePage } from '../home/home';
import {AuthService} from '../../providers/auth-service';

import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {

  preferComponent = PreferComponent;
  registerCredentials = { email: '', password: '' };


  constructor(public nav: NavController, private storage: Storage, public authService: AuthService) {

  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  /*public login() {
    console.log(this.registerCredentials)
    this.storage.set('User', JSON.stringify(this.registerCredentials));
    this.nav.setRoot(HomePage);

  }*/

  login() {
    //use this.loginData.value to authenticate the user
    console.log("login front")
    this.authService.login(this.registerCredentials)
      .then(data => {
        console.log(data);
       // this.redirectToHome();
      })
      .catch(e => console.log("login error", e));
  }


  redirectToHome() {
    this.nav.setRoot(HomePage);
  }
}
