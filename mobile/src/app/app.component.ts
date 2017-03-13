import { ConnectionNetworkPage } from '../pages/connection-network/connection-network';
import { HomePage } from '../pages/home/home';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthController } from './../providers/auth-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, public authCtrl: AuthController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // auto-login if has already been authenticated
      if (this.authCtrl.hasBeenAuthenticated()) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = ConnectionNetworkPage;
      }
    });
  }
}
