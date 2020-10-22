import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Debe crear el formulario de menu con tres campos, window, username, password', () => {
    expect(component.formChangeWindow.contains('window')).toBeTruthy();
    expect(component.formChangeWindow.contains('username')).toBeTruthy();
    expect(component.formChangeWindow.contains('password')).toBeTruthy();
  });

  it('El campo window en menu debe de ser obligatorio', () => {
    const control = component.formChangeWindow.get('window');
    control.setValue('');
    expect(control.valid).toBeFalsy();
    });

  it('El campo username en menu debe de ser obligatorio', () => {
    const control = component.formChangeWindow.get('username');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('El campo password en menu debe de ser obligatorio', () => {
    const control = component.formChangeWindow.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
    });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
