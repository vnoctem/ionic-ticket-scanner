import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { HomePage } from '../pages/home/home';
import { ScannerPage } from '../pages/scanner/scanner';
import { ConnectionNetworkPage } from '../pages/connection-network/connection-network';
import { ConnectionServerPage } from '../pages/connection-server/connection-server';
import { AuthController } from './../providers/auth-controller';
import { AppSettings } from './../providers/app-settings';
import { ScanController } from './../providers/scan-controller';
import { NetworkController } from './../providers/network-controller';
import { ServerController } from './../providers/server-controller';


@NgModule({
  declarations: [
    MyApp,
    AuthenticationPage,
    HomePage,
    ScannerPage,
    ConnectionNetworkPage,
    ConnectionServerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthenticationPage,
    HomePage,
    ScannerPage,
    ConnectionNetworkPage,
    ConnectionServerPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppSettings,
    AuthController,
    ScanController,
    NetworkController,
    ServerController
  ]
})
export class AppModule {}
