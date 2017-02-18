import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { HomePage } from '../pages/home/home';
import { ScannerPage } from '../pages/scanner/scanner';
import { AuthController } from './../providers/auth-controller';
import { AppSettings } from './../providers/app-settings';
import { ScanController } from './../providers/scan-controller';

@NgModule({
  declarations: [
    MyApp,
    AuthenticationPage,
    HomePage,
    ScannerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthenticationPage,
    HomePage,
    ScannerPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppSettings,
    AuthController,
    ScanController
  ]
})
export class AppModule {}
