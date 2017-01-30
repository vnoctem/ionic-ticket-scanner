import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthentificationPage } from '../pages/authentification/authentification';
import { AccueilPage } from '../pages/accueil/accueil';
import { ScannerPage } from '../pages/scanner/scanner';


@NgModule({
  declarations: [
    MyApp,
    AuthentificationPage,
    AccueilPage,
    ScannerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthentificationPage,
    AccueilPage,
    ScannerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
