import { Injectable } from '@angular/core';

const CONFIG = {
  managementApiUrl: 'https://floating-journey-47057.herokuapp.com/api'
}

/*
  Generated class for the AppSettings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSettings {

  public getManagementApiUrl() {
    return CONFIG.managementApiUrl;
  }

}
