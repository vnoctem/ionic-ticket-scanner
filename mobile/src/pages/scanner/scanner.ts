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
          this.scanCtrl.postValidation(
            { 'GUID': barcodeData.text },
            this.authCtrl.getToken()
          )
            .then(() => {
              // Ticket is valid
              this.navCtrl.setRoot(HomePage,
                {
                  origin: this,
                  isTicketValid: true
                });
            })
            .catch(() => {
              // Ticket is invalid
              this.navCtrl.setRoot(HomePage,
                {
                  origin: this,
                  isTicketValid: false
                });
            });
        }
      })
      .catch((err) => {
        // An error occurred
        // Need a toast to show the error message
      });
  }

}
