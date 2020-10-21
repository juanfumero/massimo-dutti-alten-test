import { ShipsService } from './../services/ships.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  myResultadoStart: any[] = [];
  valorGlobal: any = null;
  constructor(private myShipService: ShipsService) { }

  ngOnInit(): void {
    this.myShipService.getListOdfBloque().subscribe(x => {
      if(x){
        this.myResultadoStart = x.results;
        this.valorGlobal = x;
      }
    });


  }

  reCallgetListOdfBloque() {
    //localStorage.removeItem('protectApi');
    let variable = this.getWithExpiry('protectApi');
    if(variable) {
      this.myShipService.getListOdfBloque().subscribe(x => {
        if(x){
          this.myResultadoStart = x.results;
          this.valorGlobal = x;
          this.setWithExpiry('protectApi', false, 5);
        }
      });
    }

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


  setWithExpiry(key, value, ttl) {
    const now = new Date();
      const item = {
      value: value,
      expiry: now.getMinutes() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return true
    }
    const item = JSON.parse(itemStr)
    const now = new Date();
    if (now.getMinutes() > item.expiry) {
      localStorage.removeItem(key);
      return true
    }
    return item.value
  }

}
