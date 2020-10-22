import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ RegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Debe crear el formulario de registro con cuatro campos, firstName, lastName, username, password', () => {
    expect(component.formRegistro.contains('firstName')).toBeTruthy();
    expect(component.formRegistro.contains('lastName')).toBeTruthy();
    expect(component.formRegistro.contains('username')).toBeTruthy();
    expect(component.formRegistro.contains('password')).toBeTruthy();
 });

  it('El campo firstName en registro debe de ser obligatorio', () => {
    const control = component.formRegistro.get('firstName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
    });

  it('El campo lastName en registro debe de ser obligatorio', () => {
    const control = component.formRegistro.get('lastName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('El campo username en registro debe de ser obligatorio', () => {
    const control = component.formRegistro.get('username');
    control.setValue('');
    expect(control.valid).toBeFalsy();
    });

  it('El campo password en registro debe de ser obligatorio', () => {
    const control = component.formRegistro.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
