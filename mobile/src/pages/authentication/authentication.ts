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
  private error: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authCtrl: AuthController) {
    this.presentLoading();
  }

  public createLoader(content) {
    return this.loadingCtrl.create({
      'content': content
    });
  }

  public loadNetwork() {
    return new Promise((resolve: any, reject: any) => {
      let loader = this.createLoader("En attente du réseau GTI525...");
      loader.present();

      setTimeout(() => {
        loader.dismiss();
        resolve();
      }, 1000);
    });
  }

  public loadServer() {
    return new Promise((resolve: any, reject: any) => {
      let loader = this.createLoader("En attente du serveur...");
      loader.present();

      setTimeout(() => {
        loader.dismiss();
        resolve();
      }, 1000);
    });
  }

  public presentLoading() {
    // loading sequence
    // load network first
    this.loadNetwork()
      .then(() => {
        // then load server
        return this.loadServer();
      })
      .catch((err) => {
        this.error = err;
      });
  }

  public login() {
    this.authCtrl.postLogin({
      'username': this.username,
      'password': this.password
    }).then(user => {
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      this.error = err._body.message;
    });
  }

}
