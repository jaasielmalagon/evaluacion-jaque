import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(public httpClient: HttpClient) { }

  public getUsers(): Observable<[]> {
    const url = "https://run.mocky.io/v3/d5ddf1ff-a0e2-4a7e-bbcc-e832bef6a503";
    const encabezados = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json;charset=UTF-8');
    return this.httpClient.get<[]>(url, { headers: encabezados });
  }

  public getSales(): Observable<[]> {
    const url = "https://run.mocky.io/v3/15517ca5-7e07-4ebc-bf63-5b033ec4e16a";
    const encabezados = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json;charset=UTF-8');
    return this.httpClient.get<[]>(url, { headers: encabezados });
  }
}
