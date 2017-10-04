import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PreferComponent } from '../prefer/prefer.component';
import { HomePage } from '../home/home';
import {AuthService} from '../../providers/auth-service';
import { Facebook } from '@ionic-native/facebook';


import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {
  preferComponent = PreferComponent;
  registerCredentials = { email: '', password: '' };

  constructor(public navCtrl: NavController, private storage: Storage, public authService: AuthService, public fb: Facebook) {

  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  /*public login() {
    console.log(this.registerCredentials)
    this.storage.set('User', JSON.stringify(this.registerCredentials));
    this.nav.setRoot(HomePage);

  }*/

  login() {
    //use this.loginData.value to authenticate the user
    console.log("login front");
    this.authService.login(this.registerCredentials)
      .then(data => {
        this.redirectToHome();
      })
      .catch(e => console.log("login error", e));
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.fb.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api("/me?fields=name,gender", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            console.log(user);
          })
      }, function(error){
        console.log(error);
      });
  }


  redirectToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if (val)
        this.navCtrl.push(HomePage);
    });

  }
}
