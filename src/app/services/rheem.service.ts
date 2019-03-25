import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RheemService {

  uri = 'http://192.168.50.29:8089/rheem';
  uriDB = 'http://localhost:4200/rheemDB';

  constructor(private http: HttpClient) {
  }

  static generateContent(json: any | string): any {
    if (typeof  json === 'string') {
      JSON.parse(json.replace(/(\r\n|\n|\r)/gm, ' ' ) );
    } else {
      return json;
    }
  }

  execute(json: string): boolean {
    this.http.post( `${this.uri}/plan_executions`, RheemService.generateContent(json), {headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Origin': '*'}} )
      .subscribe(res => console.log('Done'));
    return true;
  }

  savePlan(json: any | string): boolean {
    console.log('saving in the db');
    this.http.post(`${this.uriDB}/add`, RheemService.generateContent(json)
    ).subscribe(
      res => console.log('Done Save')
    );
    return true;
  }
}
