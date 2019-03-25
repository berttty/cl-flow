import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Conexion} from '../rheem-class/Conexion';
import {Operator} from '../rheem-class/Operator';

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
      return JSON.parse(JSON.stringify(json.replace(/(\r\n|\n|\r)/gm, ' ' )));
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
    if ( typeof json !== 'string' ) {
      console.log(json);
      json.conexions = json.conexions.map(
        (con: Conexion) =>  {
          return {
            endOperator: con.endOperator.getName(),
            endSocket: con.endSocket,
            startOperator: con.startOperator.getName(),
            startSocket: con.startSocket
          };
        }
      );
      json.sinks = json.sinks.map(
        (ope: Operator) =>  {
          return ope.getName();
        }
      );
      json.sources = json.sources.map(
        (ope: Operator) =>  {
          return ope.getName();
        }
      );
      json.listOperator.forEach(
        (ope: Operator) =>  {
          ope.setConexiones(
            ope.getConexions().map(
            (con: Conexion) => {
              return {
                endOperator: con.endOperator.getName(),
                endSocket: con.endSocket,
                startOperator: con.startOperator.getName(),
                startSocket: con.startSocket
                };
              }
            )
          );
          ope.getMetaInformation().operator = null;
          ope.getMetaInformation().conf.operator = null;
          ope.setOrigin(null);
        }
      );
    }

    this.http.post(`${this.uriDB}/add`, RheemService.generateContent(json)
    ).subscribe(
      res => console.log('Done Save')
    );
    return true;
  }

  getList(): Observable<any> {
    return this.http.get(`${this.uriDB}/`);
  }

  getPlan(id: string): Observable<any> {
    return this.http.get(`${this.uriDB}/get/${id}`);
  }
}
