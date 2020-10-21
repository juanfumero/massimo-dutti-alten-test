import { Component, Input, OnInit } from '@angular/core';
import { ShipsService } from '../../services/ships.service';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss']
})
export class StarshipComponent implements OnInit {

  @Input() startShipItem: any;
  imageURL: string;
  esImagen: boolean = false;
  constructor(private shipService: ShipsService) { }

  ngOnInit(): void {

    let imagenUrl = 'https://starwars-visualguide.com/assets/img/starships/' + this.getStarshipId(this.startShipItem.url) + '.jpg';

    this.shipService.getImage(imagenUrl).subscribe(x => {
      if(x.status === 200) {
        this.esImagen = true;
        this.imageURL = x.url;
      } else {
        this.esImagen = false;
      }
    },(error)=>{
      if(error.status === 200) {
        this.esImagen = true;
        this.imageURL = error.url;
      } else {
        this.esImagen = false;
      }
    });
  }

  getStarshipId( url: string) {
    let miResult = url.split("/").filter(item =>
       item != "").slice(-1)[0];
    return miResult;
  }


}
