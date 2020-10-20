import { Flash } from './login/model/flash';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  usuarioArray: any[] = [];

  flash: Flash;

  constructor(private router: Router) { }




}
