import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioArray: Register[] = [];

  userSubject: BehaviorSubject<Register>;

  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<Register>(JSON.parse(localStorage.getItem('usuario')));
   }


 public get userValue(): Register {
    return this.userSubject.value;
}

  createUser(key:string, usuario: Register){
      let resultado: Register[]  = this.getUser('usuario');
      if(resultado && resultado.length) {
        this.usuarioArray.push(usuario);
        localStorage.setItem(key, JSON.stringify(this.usuarioArray));
      } else {
        this.usuarioArray.push(usuario);
        localStorage.setItem(key, JSON.stringify(this.usuarioArray));
      }

    }

  getUser(key: string) {
    return JSON.parse( localStorage.getItem(key));
  }

  removeUser(key: string): void {
    localStorage.removeItem(key);
  }

  logoutService(){
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
