import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinAreaComponent } from './pin-area.component';

describe('PinAreaComponent', () => {
  let component: PinAreaComponent;
  let fixture: ComponentFixture<PinAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
