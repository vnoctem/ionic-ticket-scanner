import { ConnectionPage } from './../pages/connection/connection';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthenticationPage } from '../pages/authentication/authentication';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = ConnectionPage;

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
