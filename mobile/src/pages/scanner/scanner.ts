import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/*
  Generated class for the Scanner page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html'
})
export class ScannerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  // prototype : go back to HomePage with a valid ticket
  goToHomeTicketValid() {
    this.navCtrl.setRoot(HomePage, 
    {
      origin: this,
      isTicketValid: true
    });
  }

  // prototype : go back to HomePage with an invalid ticket
  goToHomeTicketInvalid() {
    this.navCtrl.setRoot(HomePage, 
    {
      origin: this,
      isTicketValid: false
    });
  }

}
