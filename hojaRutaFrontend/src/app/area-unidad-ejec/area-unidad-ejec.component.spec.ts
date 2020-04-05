import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaUnidadEjecComponent } from './area-unidad-ejec.component';

describe('AreaUnidadEjecComponent', () => {
  let component: AreaUnidadEjecComponent;
  let fixture: ComponentFixture<AreaUnidadEjecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaUnidadEjecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaUnidadEjecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
