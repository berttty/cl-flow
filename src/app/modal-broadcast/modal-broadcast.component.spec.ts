import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBroadcastComponent } from './modal-broadcast.component';

describe('ModalBroadcastComponent', () => {
  let component: ModalBroadcastComponent;
  let fixture: ComponentFixture<ModalBroadcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBroadcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
