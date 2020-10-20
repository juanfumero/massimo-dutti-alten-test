import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss']
})
export class StarshipComponent implements OnInit {

  @Input() startShipItem: any;
  imageURL: string;
  constructor() { }

  ngOnInit(): void {

    this.imageURL = 'https://starwars-visualguide.com/assets/img/starships/' + this.getStarshipId(this.startShipItem.url) + '.jpg';
  }

  getStarshipId( url: string) {
    let miResult = url.split("/").filter(item =>
       item != "").slice(-1)[0];
    return miResult;
  }


}
