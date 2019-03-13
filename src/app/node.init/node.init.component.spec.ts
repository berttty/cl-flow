import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Node.InitComponent } from './node.init.component';

describe('Node.InitComponent', () => {
  let component: Node.InitComponent;
  let fixture: ComponentFixture<Node.InitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Node.InitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Node.InitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
