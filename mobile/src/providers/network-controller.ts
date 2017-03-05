import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const CONFIG = {
  networkName: 'GTI525',
  networkPassword: 'GTI525',
}

/*
  Generated class for the NetworkController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkController {

  constructor(public http: Http) {
  }

}
