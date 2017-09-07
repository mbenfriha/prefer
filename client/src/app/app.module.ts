import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';
import { Storage } from '@ionic/storage';

import { HttpModule, Http, RequestOptions } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login.component';
import { PreferComponent }         from '../pages/prefer/prefer.component';
import { CategoryPage }         from '../pages/category/category.component';

import { PreferService } from '../providers/prefer-service';
import { AuthService } from '../providers/auth-service';


export function authHttpServiceFactory(http) {
  let _storage = new Storage({});

  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    tokenGetter: (() => _storage.get('id_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PreferComponent,
    CategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PreferComponent,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JwtHelper,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PreferService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AppModule {}
