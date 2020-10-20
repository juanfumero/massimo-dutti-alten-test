import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss']
})
export class StarshipsListComponent implements OnInit {

  @Input() startShip: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
