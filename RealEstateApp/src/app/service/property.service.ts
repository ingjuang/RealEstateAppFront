import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  API_URL: string = environment.API_URL;
  results: any;
  loading: boolean;
  headers: HttpHeaders = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {
    this.loading = false;
  }

  get() {
    let promise = new Promise((resolve, reject) => {
      let url = `${this.API_URL}property/get`;
      this.http
        .get(url, { headers: this.headers })
        .toPromise()
        .then(
          (res: any) => {
            //Success
            this.results = res;
            resolve(res);
          },
          (msg) => {
            //Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  post(owner: any) {
    let promise = new Promise((resolve, reject) => {
      let url = `${this.API_URL}property`;
      this.http
        .post(url, owner, { headers: this.headers })
        .toPromise()
        .then(
          (res: any) => {
            //Success
            this.results = res;
            resolve(res);
          },
          (msg) => {
            //Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  getById(idProperty: any) {
    let promise = new Promise((resolve, reject) => {
      let url = `${this.API_URL}property/getById?IdProperty=${idProperty}`;
      this.http
        .get(url, { headers: this.headers })
        .toPromise()
        .then(
          (res: any) => {
            //Success
            this.results = res;
            resolve(res);
          },
          (msg) => {
            //Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  put(property: any) {
    let promise = new Promise((resolve, reject) => {
      let url = `${this.API_URL}property`;
      this.http
        .put(url, property, { headers: this.headers })
        .toPromise()
        .then(
          (res: any) => {
            //Success
            this.results = res;
            resolve(res);
          },
          (msg) => {
            //Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  delete(propertyId: number) {
    let promise = new Promise((resolve, reject) => {
      let url = `${this.API_URL}property?IdProperty=${propertyId}`;
      this.http
        .delete(url, { headers: this.headers })
        .toPromise()
        .then(
          (res: any) => {
            //Success
            this.results = res;
            resolve(res);
          },
          (msg) => {
            //Error
            reject(msg);
          }
        );
    });
    return promise;
  }
}
