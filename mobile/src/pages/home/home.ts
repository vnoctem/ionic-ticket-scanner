import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScannerPage } from '../scanner/scanner';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private isOriginScanner: boolean = false;
  private isTicketValid: boolean = false;
  private ticket: any;
  private message: String;
  private error: any;
  private pageTitle: String = 'Accueil';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // check if the page that called HomePage is ScannerPage
    this.isOriginScanner = this.navParams.get('isOriginScanner');
    // change page title if it's a scan result
    if (this.isOriginScanner) {
      this.pageTitle = 'Résultat';
    }
    
    this.isTicketValid = this.navParams.get('isTicketValid');
    // retrieve the information of the ticket if it's valid
    if (this.isTicketValid) {
      this.ticket = this.navParams.get('ticket');
    }

    this.message = this.navParams.get('message');
    this.error = this.navParams.get('error');
  }

  public goToScanner() {
    this.navCtrl.setRoot(ScannerPage);
  }
}