import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';

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

  // prototype : go back to AccueilPage with a valid ticket
  goToAccueilTicketValid() {
    this.navCtrl.setRoot(AccueilPage, 
    {
      origin: this,
      isTicketValid: true
    });
  }

  // prototype : go back to AccueilPage with an invalid ticket
  goToAccueilTicketInvalid() {
    this.navCtrl.setRoot(AccueilPage, 
    {
      origin: this,
      isTicketValid: false
    });
  }

}
