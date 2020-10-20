
//Locale
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { StarWarRoutingModule } from './startwar-routing.module';
import { ShipsComponent } from './ships/ships.component';

@NgModule({
  declarations: [
  ShipsComponent],
  imports: [
    StarWarRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es" }
  ],
  bootstrap: [ShipsComponent]
})

export class StarWarModule { }
