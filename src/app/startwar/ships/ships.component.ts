import { ShipsService } from './../services/ships.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  myResultadoStart: any[] = [];
  constructor(private myShipService: ShipsService) { }

  ngOnInit(): void {
    this.myShipService.getListOdfBloque().subscribe(x => {
      if(x){
        this.myResultadoStart = x.results;
        console.log('imprimo mi resultado', this.myResultadoStart);
      }
    });
  }

}
