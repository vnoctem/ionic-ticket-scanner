import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from './app-settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ServerController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServerController {

  private managementApiUrl: string = this.appSettings.getManagementApiUrl();

  constructor(public http: Http, public appSettings: AppSettings) {
  }

  // we make an empty POST request to the API to verify if it's available or not
  // it will return a status 0, if the API is not available
  public isServerAvailable() {
    return this.http.post(
      this.managementApiUrl + '/tickets/validation', {}
    )
      .map(res => res.json())
      .toPromise();
  }
}