import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from './app-settings';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the AuthController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthController {

  private managementApiUrl: string = this.appSettings.getManagementApiUrl();
  private currentUser: any;

  constructor(public http: Http, public appSettings: AppSettings) {
  }

  public postLogin(data: any) {
    return this.http.post(this.managementApiUrl + '/login', data)
      .map(res => res.json())
      .toPromise()
      .then(res => {
        this.currentUser = res.user;
        return this.currentUser;
      })
      .catch(err => {
        // Only return the error so that the client can handle it
        err._body = JSON.parse(err._body);
        return Promise.reject(err);
      });
  }

  public getToken() {
    return this.currentUser.token;
  }

}
