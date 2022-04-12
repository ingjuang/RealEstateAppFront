import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  API_URL:string = environment.API_URL;
  results:any;
  loading:boolean;
  headers: HttpHeaders = new HttpHeaders()
  .set('content-type','application/json')
  .set('Access-Control-Allow-Origin', '*')


  constructor(private http: HttpClient) {
    this.loading = false;
   }


   get(idProperty: number){
    let promise = new Promise((resolve, reject)=>{
      let url = `${this.API_URL}propertyImage/get?idProperty=${idProperty}`;
      this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(
          (res: any) =>{//Success
            this.results = res
            resolve(res);
          },
          msg=>{//Error
            reject(msg)
          }
        );
    })
    return promise
  }

  post(owner: any){
    let promise = new Promise((resolve, reject)=>{
      let url = `${this.API_URL}propertyImage`;
      this.http.post(url, owner, {headers: this.headers})
        .toPromise()
        .then(
          (res: any) =>{//Success
            this.results = res
            resolve(res);
          },
          msg=>{//Error
            reject(msg)
          }
        );
    })
    return promise
  }

  getById(idOwner: any){
    let promise = new Promise((resolve, reject)=>{
      let url = `${this.API_URL}propertyImage/getById?IdPropertyImage=${idOwner}`;
      this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(
          (res: any) =>{//Success
            this.results = res
            resolve(res);
          },
          msg=>{//Error
            reject(msg)
          }
        );
    })
    return promise
  }

  put(owner: any){
    let promise = new Promise((resolve, reject)=>{
      let url = `${this.API_URL}propertyImage`;
      this.http.put(url, owner, {headers: this.headers})
        .toPromise()
        .then(
          (res: any) =>{//Success
            this.results = res
            resolve(res);
          },
          msg=>{//Error
            reject(msg)
          }
        );
    })
    return promise
  }

}
