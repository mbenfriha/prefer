import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PreferComponent } from '../prefer/prefer.component';

import { LoginPage } from '../login/login.component';
import { CategoryPage } from '../category/category.component';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  preferComponent = PreferComponent;
  CategoryPage = CategoryPage;

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if (!val)
        this.navCtrl.push(LoginPage);
    });

  }

}
