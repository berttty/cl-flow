import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonModalSaveComponent } from './action-button-modal-save.component';

describe('ActionButtonModalSaveComponent', () => {
  let component: ActionButtonModalSaveComponent;
  let fixture: ComponentFixture<ActionButtonModalSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonModalSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonModalSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
