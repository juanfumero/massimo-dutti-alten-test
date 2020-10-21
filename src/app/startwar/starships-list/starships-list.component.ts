import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss']
})
export class StarshipsListComponent implements OnInit {

  @Input() startShip: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  naveEventoClic($evento){
    this.router.navigate(['/inicio/starshipdetail/', $evento]);
  }

}
