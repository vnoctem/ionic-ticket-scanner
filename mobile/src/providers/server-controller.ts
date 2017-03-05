import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from './app-settings';
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

  public isServerAvailable(token: string) {
    let headers = new Headers();
    headers.append('Authorization', token);
    return this.http.post(
      this.managementApiUrl + '/tickets/validation',
      new RequestOptions({ 'headers': headers })
    )
      .map(res => res.json())
      .toPromise();
  }
}
