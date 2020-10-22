import { LoginService } from './service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from './model/register';
import { AppService } from '../app.service';
import { Flash } from './model/flash';
import { Router } from '@angular/router';
import { PANTALLA_ENUM } from '../startwar/enum/pantalla.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  myFlashLoginr: Flash;
  mensajeAlerta: boolean = false;
  dataLoading: boolean = false;

  constructor( private fb: FormBuilder, private loginService: LoginService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmitLoginForm() {
      this.dataLoading = true;
      let user = this.formulario.get('username').value;
      let pass = btoa(this.formulario.get('password').value);
      let resultado: Register[]  = this.loginService.getUser('usuario');
      setTimeout(() => {
        let buscar = resultado.find(userRe => userRe.usuario.username === user && userRe.usuario.password === pass);
        if(buscar) {
          if(buscar.window ===  PANTALLA_ENUM.SHIP) {
            this.router.navigate(['/inicio/ships']);
          } else if (buscar.window ===  PANTALLA_ENUM.PANTALLA) {
            this.router.navigate(['/inicio/pantalla']);
          }
          this.dataLoading = false;
        } else {
          this.loginError();
          this.dataLoading = false;
        }
      }, 3000);

  }

  loginError() {
    this.appService.flash = new Flash();
    this.myFlashLoginr = this.appService.flash;
    this.myFlashLoginr.message =  `Usuario o contraseña inconrrectos`;
    this.myFlashLoginr.type = "error";
    this.mensajeAlerta = true;
  }



}
