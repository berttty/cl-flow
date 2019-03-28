import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExecResponseComponent } from './modal-exec-response.component';

describe('ModalExecResponseComponent', () => {
  let component: ModalExecResponseComponent;
  let fixture: ComponentFixture<ModalExecResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExecResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExecResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
