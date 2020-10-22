import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipsService } from '../services/ships.service';

@Component({
  selector: 'app-starships-detail',
  templateUrl: './starships-detail.component.html',
  styleUrls: ['./starships-detail.component.scss']
})
export class StarshipsDetailComponent implements OnInit {
  idShip: string;
  infoStarship: any;
  imageURL: string;
  esImagen: boolean = false;
  idStartShip: string;
  constructor(private router: Router, private rutaActiva: ActivatedRoute, private shipService: ShipsService) { }

  ngOnInit(): void {
    this.idShip = this.rutaActiva.snapshot.params.id;

    this.shipService.getDetailStarship(this.idShip).subscribe(item => {
          this.infoStarship = item;
    });
    this.agregarImagen(this.idShip);
  }

  regresar(){
    this.router.navigate(['/inicio/ships/']);
  }

  agregarImagen(id: string){
    let imagenUrl = 'https://starwars-visualguide.com/assets/img/starships/' + id + '.jpg';

    this.shipService.getImage(imagenUrl).subscribe(imagenes => {
      if(imagenes.status === 200) {
        this.esImagen = true;
        this.imageURL = imagenes.url;
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
}
