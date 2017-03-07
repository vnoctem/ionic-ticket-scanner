import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BarcodeScanner } from 'ionic-native';
import { ScanController } from './../../providers/scan-controller'
import { AuthController } from './../../providers/auth-controller'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanCtrl: ScanController, public authCtrl: AuthController) {
    // Start scanning
    BarcodeScanner.scan()
      .then(barcodeData => {
        // Not cancelled by user and is a QR code
        if (!barcodeData.cancelled && barcodeData.format == 'QR_CODE') {
          return this.scanCtrl.postValidation(
            { 'GUID': barcodeData.text },
            this.authCtrl.getToken()
          );
        }
      })
      .then(ticket => {
        // Ticket is valid
        this.navCtrl.setRoot(HomePage,
          {
            'isOriginScanner': true,
            'isTicketValid': true,
            'ticket': ticket
          });
      })
      .catch(err => {
        if (err.status == 0) { // API unavailable
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Erreur',
              'error': 'Le serveur n\'est pas disponible.'
            });
        } else { // Ticket is invalid (invalid QR code or already scanned)
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