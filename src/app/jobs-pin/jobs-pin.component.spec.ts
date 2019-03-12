import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPinComponent } from './jobs-pin.component';

describe('JobsPinComponent', () => {
  let component: JobsPinComponent;
  let fixture: ComponentFixture<JobsPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
