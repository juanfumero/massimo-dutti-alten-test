import { StarWarModule } from './startwar/startwar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './login/registro/registro.component';
import { LoginService } from './login/service/login.service';
import { AppService } from './app.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCacheService } from './helpers/requestCache.service';
import { CacheInterceptor } from './helpers/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StarWarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    LoginService, AppService, RequestCacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
