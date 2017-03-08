import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BarcodeScanner } from 'ionic-native';
import { ScanController } from './../../providers/scan-controller'
import { AuthController } from './../../providers/auth-controller'
import { AuthenticationPage } from '../authentication/authentication'


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

  private isCancelled: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanCtrl: ScanController, public authCtrl: AuthController) {
    this.isCancelled = false;

    // Start scanning
    BarcodeScanner.scan()
      .then(barcodeData => {
        // Not cancelled by user and is a QR code
        if (!barcodeData.cancelled && barcodeData.format == 'QR_CODE') {
          return this.scanCtrl.postValidation(
            { 'GUID': barcodeData.text },
            this.authCtrl.getToken()
          );
        } else if (barcodeData.cancelled) { // If scan is cancelled by user
          this.isCancelled = true;
          this.navCtrl.setRoot(HomePage);
        }
      })
      .then(ticket => {
        // Ticket is valid and scan was not cancelled
        if (!this.isCancelled) {
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'isTicketValid': true,
              'ticket': ticket
            });
        }
      })
      .catch(err => {
        if (this.convertToJSON(err)._body.redirect) { // Token is invalid (expired)
          this.navCtrl.setRoot(AuthenticationPage,
            {
              'error': this.convertToJSON(err)._body.message
            });
        } else if (err.status == 0) { // API unavailable
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Erreur',
              'error': 'Le serveur n\'est pas disponible.'
            });
        } else { // Ticket is invalid (doesn't exist or already scanned)
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'isTicketValid': false,
              'message': this.convertToJSON(err)._body.message
            });
        }
      });
  }

  private convertToJSON(err: any) {
    if (typeof err._body === 'string') {
      err._body = JSON.parse(err._body);
    }
    return err;
  }

}