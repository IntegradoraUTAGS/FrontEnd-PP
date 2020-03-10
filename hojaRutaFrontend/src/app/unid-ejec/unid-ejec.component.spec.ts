import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidEjecComponent } from './unid-ejec.component';

describe('UnidEjecComponent', () => {
  let component: UnidEjecComponent;
  let fixture: ComponentFixture<UnidEjecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidEjecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidEjecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
