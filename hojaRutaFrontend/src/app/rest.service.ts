import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError} from 'rxjs/operators';
const endPoint = 'https://hoja-ruta.herokuapp.com/'
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  getUser(): Observable <any>{
   return this.http.get(endPoint +'usuario');
  }
  addUser(product): Observable <any>{
    return this.http.post<any>(endPoint + 'usuario',product);
   }
   updateUser(id, product): Observable <any>{
    return this.http.put(endPoint + 'usuario/' + id, product);
   }
   deleteUser(id): Observable <any>{
    return this.http.delete(endPoint +'usuario/'+ id);
   }
   logearUser(prod): Observable <any>{
    return this.http.post(endPoint + 'login',prod);
   }
   getUserById(id): Observable <any>{
    return this.http.get(endPoint +'usuario/'+id);
   }
   ////////CRUD unidad ejecutora///////////
   getUnidadEject(): Observable <any>{
    return this.http.get(endPoint +'unidadEjecutora');
   }
   addUnidadEject(product): Observable <any>{
    return this.http.post<any>(endPoint + 'unidadEjecutora',product);
   }
   updateUnidadEject(id, product): Observable <any>{
    return this.http.put(endPoint + 'unidadEjecutora/' + id, product);
   }
   deleteUnidadEject(id): Observable <any>{
    return this.http.delete(endPoint +'unidadEjecutora/'+ id);
   }
   ///////CRUD programa presupuestario //////////////
   getPrograma(): Observable <any>{
    return this.http.get(endPoint +'programa');
   }
   getProgramaPorAño(): Observable <any>{
    return this.http.get(endPoint +'programa/year');
   }
   addPRograma(product): Observable <any>{
    return this.http.post<any>(endPoint + 'programa',product);
   }
   updatePrograma(id, product): Observable <any>{
    return this.http.put(endPoint + 'programa/' + id, product);
   }
   deletePrograma(id): Observable <any>{
    return this.http.delete(endPoint +'programa/'+ id);
   }
}

