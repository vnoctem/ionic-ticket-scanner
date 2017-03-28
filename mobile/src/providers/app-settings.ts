import { Injectable } from '@angular/core';

const CONFIG = {
  managementApiUrl: 'http://borne.gti525.org/api'
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
