import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaPresupuestalComponent } from './programa-presupuestal.component';

describe('ProgramaPresupuestalComponent', () => {
  let component: ProgramaPresupuestalComponent;
  let fixture: ComponentFixture<ProgramaPresupuestalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaPresupuestalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaPresupuestalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
