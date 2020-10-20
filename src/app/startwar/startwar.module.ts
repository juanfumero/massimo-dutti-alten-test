import { ShipsService } from './services/ships.service';

//Locale
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { StarWarRoutingModule } from './startwar-routing.module';
import { ShipsComponent } from './ships/ships.component';
import { StarshipsListComponent } from './starships-list/starships-list.component';
import { StarshipComponent } from './starships-list/starship/starship.component';

@NgModule({
  declarations: [
  ShipsComponent,
  StarshipsListComponent,
  StarshipComponent],
  imports: [
    StarWarRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  providers: [
    ShipsService,
    { provide: LOCALE_ID, useValue: "es" }
  ],
  bootstrap: [ShipsComponent]
})

export class StarWarModule { }
