import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  constructor(private router: Router, private http: HttpClient) { }


  getListOdfBloque(): Observable<any> {
    return this.http.get<any>('https://swapi.dev/api/starships/');
  }

 // https://swapi.dev/api/starships/
}
