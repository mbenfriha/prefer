import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Storage} from '@ionic/storage';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
//import {UserModel} from '../models/user.model';
import { CredentialsModel } from '../models/credentials.models';
import { UserModel } from '../models/user.models';

@Injectable()
export class AuthService {
  idToken:string;
  user:UserModel;
  private apiUrl = 'http://localhost:8000/';  // URL to web api

  constructor(private storage:Storage,
              private http:Http,
              private jwtHelper:JwtHelper,
              private authHttp:AuthHttp) {
    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });
    this.storage.get('user').then(user => {
      this.user = user;
    });
  }

  login(credentials: CredentialsModel) {
    return this.http.post(this.apiUrl + 'auth/login', credentials)
      .toPromise()
      .then(data => {
        let rs = data.json();
        this.saveData(data);
        this.idToken = rs.token;
        this.user = rs.user;

      })
      .catch(e => console.log('login error', e));
  }

  saveData(data: any) {
    let rs = data.json();
    console.log(rs);
    this.storage.set("user", rs.user);
    this.storage.set("id_token", rs.token);
  }
}
