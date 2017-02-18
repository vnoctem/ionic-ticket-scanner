import { AuthenticationPage } from './../authentication/authentication';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/*
  Generated class for the Connection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html'
})
export class ConnectionPage {

  private error: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
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

      throw 'Error';
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
    }).then(() => {
        this.navCtrl.setRoot(AuthenticationPage);
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

  public retry() {
    this.presentLoading();
  }
}
