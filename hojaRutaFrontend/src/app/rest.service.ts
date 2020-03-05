import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError} from 'rxjs/operators';
const endPoint = 'http://localhost:3000/usuario'
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  getUser(): Observable <any>{
   return this.http.get(endPoint);
  }
  addUser(product): Observable <any>{
    return this.http.post<any>(endPoint, JSON.stringify(product));
   }
   updateUser(id,product): Observable <any>{
    return this.http.put(endPoint + id, JSON.stringify(product));
   }
   deleteUser(id): Observable <any>{
    return this.http.delete(endPoint +'/'+ id);
   }
}

