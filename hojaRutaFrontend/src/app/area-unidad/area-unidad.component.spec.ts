import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaUnidadComponent } from './area-unidad.component';

describe('AreaUnidadComponent', () => {
  let component: AreaUnidadComponent;
  let fixture: ComponentFixture<AreaUnidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaUnidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
