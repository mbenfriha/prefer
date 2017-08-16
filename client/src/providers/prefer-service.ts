import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the PreferService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PreferService {

  constructor(public http: Http) {
    console.log('Hello PreferService Provider');
  }


  private apiUrl = 'http://localhost:8000/';  // URL to web api


  getPreferRandom() {
    return this.http.get(this.apiUrl + 'prefer/random')
      .map(res => res.json())
  }
  setPrefer(choice: number, id: number) {
    return this.http.get(this.apiUrl + 'prefer/' + id + '/' + choice)
      .map(res => res.json())
  }



}
