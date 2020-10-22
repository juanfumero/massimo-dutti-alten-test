import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsDetailComponent } from './starships-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('StarshipsDetailComponent', () => {
  let component: StarshipsDetailComponent;
  let fixture: ComponentFixture<StarshipsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClient, BrowserDynamicTestingModule
      ],
      declarations: [ StarshipsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
