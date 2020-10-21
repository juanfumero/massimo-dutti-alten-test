import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starships-detail',
  templateUrl: './starships-detail.component.html',
  styleUrls: ['./starships-detail.component.scss']
})
export class StarshipsDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    this.router.navigate(['/inicio/ships/']);
  }
}
