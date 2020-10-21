import { PantallaComponent } from './pantalla/pantalla.component';
import { InicioComponent } from './inicio/inicio.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsComponent } from './ships/ships.component';
import { StarshipsDetailComponent } from './starships-detail/starships-detail.component';
import { MenuComponent } from './menu/menu.component';



const adminRoutes: Routes = [
    {
      path: '',
      component: InicioComponent,
      children: [
        {
          path: 'ships', component: ShipsComponent
        },
        {
          path: 'starshipdetail/:id', component: StarshipsDetailComponent
        },
        {
          path: 'menu', component: MenuComponent
        },
        {
          path: 'pantalla', component: PantallaComponent
        }
      ]
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class StarWarRoutingModule { }
