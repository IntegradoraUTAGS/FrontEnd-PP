import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestacionComponent } from './presupuestacion.component';

describe('PresupuestacionComponent', () => {
  let component: PresupuestacionComponent;
  let fixture: ComponentFixture<PresupuestacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
