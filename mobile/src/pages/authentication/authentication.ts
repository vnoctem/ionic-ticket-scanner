import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthController } from './../../providers/auth-controller'


/*
  Generated class for the Authentication page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {

  private username: string;
  private password: string;
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authCtrl: AuthController) {
    this.error = navParams.get('error');
  }

  public login() {
    this.authCtrl.postLogin({
      'username': this.username,
      'password': this.password
    })
      .then(user => {
        this.navCtrl.setRoot(HomePage, { 'isOriginScanner': false });
      })
      .catch(err => {
        if (err.status == 0) { // API unavailable
          this.error = 'Le serveur n\'est pas disponible';
        } else if (err._body.message) {
          this.error = err._body.message;
        }
      });
  }

}