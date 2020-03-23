import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestolUsuarioComponent } from './presupuestol-usuario.component';

describe('PresupuestolUsuarioComponent', () => {
  let component: PresupuestolUsuarioComponent;
  let fixture: ComponentFixture<PresupuestolUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestolUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestolUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
