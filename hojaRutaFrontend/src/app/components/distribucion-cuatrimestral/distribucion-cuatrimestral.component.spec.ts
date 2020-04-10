import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionCuatrimestralComponent } from './distribucion-cuatrimestral.component';

describe('DistribucionCuatrimestralComponent', () => {
  let component: DistribucionCuatrimestralComponent;
  let fixture: ComponentFixture<DistribucionCuatrimestralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribucionCuatrimestralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribucionCuatrimestralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
