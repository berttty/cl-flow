import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsModalComponent } from './jobs-modal.component';

describe('JobsModalComponent', () => {
  let component: JobsModalComponent;
  let fixture: ComponentFixture<JobsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
