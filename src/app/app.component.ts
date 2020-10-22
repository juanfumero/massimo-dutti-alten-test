import { Flash } from './login/model/flash';
import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'start-wars-angular-test';
  myFlash: Flash;
  constructor(private flashApi: AppService){
    this.title = this.retornaTitulo();
  }

  retornaTitulo(){
    return 'start-wars-angular-test';
  }
}
