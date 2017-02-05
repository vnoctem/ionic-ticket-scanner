import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { HomePage } from '../pages/home/home';
import { ScannerPage } from '../pages/scanner/scanner';


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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
