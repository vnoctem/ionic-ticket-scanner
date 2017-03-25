import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from './app-settings';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ScanController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ScanController {

  private managementApiUrl: string = this.appSettings.getManagementApiUrl();

  constructor(public http: Http, public appSettings: AppSettings) {
  }

  public postValidation(ticketHash: any) {
    let headers = new Headers();
    headers.append('api-key', 'bob'); // 'bob' will be change later on for production
    return this.http.post(
      `${this.managementApiUrl}/ticket/validate/${ticketHash}/`,
      '',
      new RequestOptions({ 'headers': headers })
    )
      .map(res => res.json())
      .toPromise()
      .then(res => res);
  }
  
}