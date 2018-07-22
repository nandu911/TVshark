import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedisplayComponent } from './moviedisplay.component';

describe('MoviedisplayComponent', () => {
  let component: MoviedisplayComponent;
  let fixture: ComponentFixture<MoviedisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviedisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
