import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('Debe crear el formulario de login con dos campos, username y password', () => {
    expect(component.formulario.contains('username')).toBeTruthy();
    expect(component.formulario.contains('password')).toBeTruthy();
  });

  it('El campo username debe de ser obligatorio', () => {
  const control = component.formulario.get('username');
  control.setValue('');
  expect(control.valid).toBeFalsy();
  });

  it('El campo password debe de ser obligatorio', () => {
  const control = component.formulario.get('password');
  control.setValue('');
  expect(control.valid).toBeFalsy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
