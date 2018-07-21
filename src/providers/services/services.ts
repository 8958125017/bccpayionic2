import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {

  constructor(public http: Http) {
   this.http = http;    
    console.log('Hello ServicesProvider Provider');
  }
    endpoint_url: string = 'http://162.213.252.66:1338';

   

}
