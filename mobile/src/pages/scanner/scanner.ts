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

  private isCancelled: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanCtrl: ScanController, public authCtrl: AuthController) {
    this.isCancelled = false;

    // Start scanning
    BarcodeScanner.scan()
      .then(barcodeData => {
        // Not cancelled by user and is a QR code
        if (!barcodeData.cancelled && barcodeData.format == 'QR_CODE') {
          return this.scanCtrl.postValidation(
            barcodeData.text
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
        if (err.status == 0) { // API unavailable
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Erreur',
              'error': 'Le serveur n\'est pas disponible.'
            });
        } else if (err.status == 400) { // **Should not happen** : Bad request (The request cannot be fulfilled due to bad syntax)
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Erreur',
              'error': 'Mauvaise requête.'
            });
        } else if (err.status == 403) { // ** Should not happen** : Invalid API key
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Erreur',
              'error': 'Clé API invalide.'
            });
        } else if (err.status == 404) { // Ticket not found (most likely because the QR code was not a ticket)
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Billet invalide'
            });
        } else if (err.status == 409) { // Ticket already validated
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'isTicketValid': false,
              'message': 'Billet déjà validé'
            });
        } else if (err.status == 503) { // Hotspot is out of sync with the network
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Erreur',
              'error': 'Le Raspberry Pi est désynchronisé avec le réseau.'
            });
        } else { // An unknown error happened
          this.navCtrl.setRoot(HomePage,
            {
              'isOriginScanner': true,
              'message': 'Erreur',
              'error': 'Une erreur inconnue est survenue.'
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