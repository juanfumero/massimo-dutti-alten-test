import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShipsComponent } from './ships.component';
import { ShipsService } from '../services/ships.service';

describe('ShipsComponent', () => {
  let component: ShipsComponent;
  let fixture: ComponentFixture<ShipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ ShipsComponent ],
      providers: [ShipsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('deberia validar la lista de naves starship', async(() => {
    const service: ShipsService = TestBed.get(ShipsService);
    service.getListOdfBloque().subscribe(
      (response) => expect(response.json()).not.toBeNull(),
      (error) => fail(error)
    );
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
