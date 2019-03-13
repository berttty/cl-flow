import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { CdkDragMove } from '@angular/cdk/drag-drop';

library.add(faQuestion, faCoins);

export interface NodeInitInterface {
  removeNodeInit(index: number);
}

@Component({
  selector: 'app-node-init',
  templateUrl: './node-init.component.html',
  styleUrls: ['./node-init.component.css']
})
export class NodeInitComponent implements OnInit {
  public index: number;
  public selfRef: NodeInitComponent;
  // interface for Parent-Child interaction
  public compInteraction: NodeInitInterface;

  public position;

  constructor() {}

  ngOnInit() {}

  setSource(index: number, platform: string) {
    this.removeMe(index);
  }

  removeMe(index: number) {
    this.compInteraction.removeNodeInit(index);
  }

  onStop(event) {
    this.moveTo(event.x, event.y);
  }

  moveTo(posX: number, posY: number) {
    this.position = { x: posX, y: posY };
  }

  getPosition() {
    return this.position;
  }
  getType() {
    return 'coins';
  }
}
