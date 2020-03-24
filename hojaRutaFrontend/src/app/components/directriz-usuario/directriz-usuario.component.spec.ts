import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectrizUsuarioComponent } from './directriz-usuario.component';

describe('DirectrizUsuarioComponent', () => {
  let component: DirectrizUsuarioComponent;
  let fixture: ComponentFixture<DirectrizUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectrizUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectrizUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
