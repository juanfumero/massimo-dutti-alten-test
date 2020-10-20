import { Register } from './../model/register';
import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AppService } from 'src/app/app.service';
import { Flash } from '../model/flash';

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

  constructor(private fb: FormBuilder, private loginService: LoginService, private appService: AppService) {
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

    if(resultado && resultado.length > 0){
      console.log('imprimo mi resultado y es:', resultado);
      let buscarUsuario = this.formRegistro.get('username').value;
      let busqueda = resultado.find(x => x.usuario.username === buscarUsuario);
      console.log('mi resultado busqueda es', busqueda);
      if( busqueda){
        this.registroError(buscarUsuario);
        return;
      } else {
        let myKey = resultado[resultado.length - 1].idkey;
        if(myKey === null || myKey === undefined){
          this.miRegistro.usuario = this.formRegistro.value;
          this.miRegistro.idkey = 1;
          this.loginService.createUser('usuario', this.miRegistro);
          this.registroExito();
          return;
        } else {
          this.miRegistro.usuario = this.formRegistro.value;
          this.miRegistro.idkey = myKey + 1;
          console.log('entro en el segundo create');
          this.loginService.createUser('usuario', this.miRegistro);
          this.registroExito();
          return;
        }
      }


    } else {
      this.miRegistro.usuario = this.formRegistro.value;
      this.miRegistro.idkey = 1;
      this.loginService.createUser('usuario', this.miRegistro);
      this.registroExito();
      return;
    }
  }

  registroError(usuario: string) {
    this.appService.flash = new Flash();
    this.myFlashRegister = this.appService.flash;
    this.myFlashRegister.message =  `El usuario:${usuario} ya esta registrado en el sistema`;
    this.myFlashRegister.type = "error";
    this.mensajeAlerta = true;
  }

  registroExito() {
    this.appService.flash = new Flash();
    this.myFlashRegister = this.appService.flash;
    this.myFlashRegister.message =  `El usuario fue registrado con exito`;
    this.myFlashRegister.type = "success";
    this.mensajeAlerta = true;
  }
}
