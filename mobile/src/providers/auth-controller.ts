import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from './app-settings';
import { StorageService } from './storage-service';
import 'rxjs/add/operator/toPromise';

const KEYS = {
  user: 'scan-user'
}

/*
  Generated class for the AuthController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthController {

  private managementApiUrl: string = this.appSettings.getManagementApiUrl();
  private currentUser: any;

  constructor(public http: Http, public appSettings: AppSettings, public storService: StorageService) {
    this.currentUser = this.storService.loadObject(KEYS.user);
  }

  public postLogin(data: any) {
    return this.http.post(this.managementApiUrl + '/login', data)
      .map(res => res.json())
      .toPromise()
      .then(res => {
        this.currentUser = res.user;
        // Save token and user locally
        this.storService.saveObject(KEYS.user, this.currentUser);
        return this.currentUser;
      })
      .catch(err => {
        // Only return the error so that the client can handle it
        if (typeof err._body === 'string') {
          err._body = JSON.parse(err._body);
        }
        return Promise.reject(err);
      });
  }

  public getToken() {
    return this.currentUser.token;
  }

  // return an object, but should be used as a boolean
  public hasBeenAuthenticated() {
    return this.storService.loadObject(KEYS.user);
  }

}
