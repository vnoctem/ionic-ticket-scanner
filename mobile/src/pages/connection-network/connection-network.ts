import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnectionServerPage } from '../connection-server/connection-server';

/*
  Generated class for the ConnectionNetwork page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-connection-network',
  templateUrl: 'connection-network.html'
})
export class ConnectionNetworkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public continue() {
    this.navCtrl.setRoot(ConnectionServerPage);
  }

}