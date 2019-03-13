import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeInitComponent } from './node-init.component';

describe('NodeInitComponent', () => {
  let component: NodeInitComponent;
  let fixture: ComponentFixture<NodeInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
