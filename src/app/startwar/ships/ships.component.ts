import { ShipsService } from './../services/ships.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  myResultadoStart: any[] = [];
  valorGlobal: any;
  constructor(private myShipService: ShipsService) { }

  ngOnInit(): void {
    this.myShipService.getListOdfBloque().subscribe(x => {
      if(x){
        this.myResultadoStart = x.results;
        this.valorGlobal = x;
        console.log('imprimo mi resultado', this.myResultadoStart);
      }
    });
  }

  nextResult() {
    if(this.valorGlobal.next !== null) {
      this.myShipService.getListNextOrPreview(this.valorGlobal.next).subscribe(x => {
        if(x){
          this.myResultadoStart = x.results;
          this.valorGlobal = x;
        }
      })
    }
  }

  previewResult() {
    if(this.valorGlobal.previous !== null) {
      this.myShipService.getListNextOrPreview(this.valorGlobal.previous).subscribe(x => {
        if(x){
          this.myResultadoStart = x.results;
          this.valorGlobal = x;
        }
      })
    }
  }

}
