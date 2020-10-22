import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Flash } from 'src/app/login/model/flash';
import { Register } from 'src/app/login/model/register';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  mensajeAlerta: boolean = false;
  myFlashLoginr: Flash;
  formChangeWindow: FormGroup;
  constructor(private fb: FormBuilder, private appService: AppService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.formChangeWindow = this.fb.group({
      window: ["", [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmitWindowForm(){
    let user = this.formChangeWindow.get('username').value;
    let pass = btoa(this.formChangeWindow.get('password').value);
    let win = this.formChangeWindow.get('window').value;
    let resultado: Register[]  = this.loginService.getUser('usuario');
      let buscar = resultado.find(userRe => userRe.usuario.username === user && userRe.usuario.password === pass);
      if(buscar) {
        resultado.map(user => {
          if(user.idkey === buscar.idkey){
            user.window = win;
          }
        });
        localStorage.setItem('usuario', JSON.stringify(resultado));
        this.registroExito();
      } else {
        this.menuError();
      }

  }


 registroExito() {
    this.appService.flash = new Flash();
    this.myFlashLoginr = this.appService.flash;
    this.myFlashLoginr.message =  `User was successfully registered`;
    this.myFlashLoginr.type = "success";
    this.mensajeAlerta = true;
  }

  menuError() {
    this.appService.flash = new Flash();
    this.myFlashLoginr = this.appService.flash;
    this.myFlashLoginr.message =  `Incorrect username or password`;
    this.myFlashLoginr.type = "error";
    this.mensajeAlerta = true;
  }

}
