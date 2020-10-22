import { Register } from './../model/register';
import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AppService } from 'src/app/app.service';
import { Flash } from '../model/flash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  miRegistro: Register;
  myFlashRegister: Flash;
  mensajeAlerta: boolean = false;
  botonDisable: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private appService: AppService, private router: Router) {
     this.miRegistro = new Register();
  }

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmitRegisterForm(){
    let resultado: Register[]  = this.loginService.getUser('usuario');
    //Funcion para resetear los usuarios registrados.
    //this.loginService.removeUser('usuario');
    // Base64
    this.formRegistro.get('password').setValue(btoa(this.formRegistro.get('password').value));
    if(resultado && resultado.length > 0){
      let buscarUsuario = this.formRegistro.get('username').value;
      let busqueda = resultado.find(user => user.usuario.username === buscarUsuario);
      if( busqueda){
        this.registroError(buscarUsuario);
        return;
      } else {
        let myKey = resultado[resultado.length - 1].idkey;
        if(myKey === null || myKey === undefined){
          this.miRegistro.usuario = this.formRegistro.value;
          this.miRegistro.idkey = 1;
          this.miRegistro.window = 'ship';
          this.loginService.createUser('usuario', this.miRegistro);
          this.registroExito();
          this.botonDisable = true;
          return;
        } else {
          this.miRegistro.usuario = this.formRegistro.value;
          this.miRegistro.idkey = myKey + 1;
          this.miRegistro.window = 'ship';
          this.loginService.createUser('usuario', this.miRegistro);
          this.registroExito();
          this.botonDisable = true;
          return;
        }
      }


    } else {
      this.miRegistro.usuario = this.formRegistro.value;
      this.miRegistro.idkey = 1;
      this.miRegistro.window = 'ship';
      this.loginService.createUser('usuario', this.miRegistro);
      this.registroExito();
      this.botonDisable = true;
      return;
    }
  }

  registroError(usuario: string) {
    this.appService.flash = new Flash();
    this.myFlashRegister = this.appService.flash;
    this.myFlashRegister.message =  `The user: ${usuario} are already registered in the system`;
    this.myFlashRegister.type = "error";
    this.mensajeAlerta = true;
  }

  registroExito() {
    this.appService.flash = new Flash();
    this.myFlashRegister = this.appService.flash;
    this.myFlashRegister.message =  `User was successfully registered`;
    this.myFlashRegister.type = "success";
    this.mensajeAlerta = true;

    setTimeout(() => {
        this.router.navigate(['/login']);
    }, 2000);
  }
}
