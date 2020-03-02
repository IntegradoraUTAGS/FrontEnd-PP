import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectrizComponent } from './directriz.component';

describe('DirectrizComponent', () => {
  let component: DirectrizComponent;
  let fixture: ComponentFixture<DirectrizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectrizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
