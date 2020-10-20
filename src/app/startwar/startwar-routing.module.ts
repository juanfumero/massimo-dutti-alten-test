
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsComponent } from './ships/ships.component';



const adminRoutes: Routes = [
{
  path: '',
  component: ShipsComponent,
  children: [

  ]
}

  ];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class StarWarRoutingModule { }
