import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from './../home/home';
import { ServerController } from './../../providers/server-controller';
import { AuthController } from './../../providers/auth-controller';

/*
  Generated class for the Connection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-connection-server',
  templateUrl: 'connection-server.html'
})
export class ConnectionServerPage {

  private error: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public servCtrl: ServerController, public authCtrl: AuthController) {
    this.loadServer();
  }

  public createLoader(content) {
    return this.loadingCtrl.create({
      'content': content
    });
  }

  public loadServer() {
    let loader = this.createLoader('En attente du serveur...');
    loader.present()
      .then(() => {
        return this.servCtrl.isServerAvailable();
      })
      .catch((err: any) => {
        loader.dismiss();
        switch (err.status) {
          case 0:
            this.error = 'Le serveur n\'est pas disponible.';
            break;
          default:
            this.navCtrl.setRoot(HomePage);
        }
      });
  }

  public retry() {
    this.loadServer();
  }
}
