import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonModalComponent } from './action-button-modal.component';

describe('ActionButtonModalComponent', () => {
  let component: ActionButtonModalComponent;
  let fixture: ComponentFixture<ActionButtonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
