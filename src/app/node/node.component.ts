import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faCoins, faHammer, faBrain, faPuzzlePiece, faBullseye, faChild, faTrashAlt);

export interface NodeInterface {
  removeNode(index: number);
  createNext(index: number);
}

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: [
    './node.component.css',
    './node.level1.component.css',
    './node.level2.ele1.component.css',
    './node.level2.ele2.component.css',
    './node.level2.ele3.component.css',
    './node.level2.ele4.component.css',
    './node.level2.ele5.component.css'
  ]
})
export class NodeComponent implements OnInit {
  public index: number;
  public selfRef: NodeComponent;
  public icon: string;
  public selection: string;
  // interface for Parent-Child interaction
  public compInteraction: NodeInterface;

  public position: {x: number, y: number};

  constructor() { }

  ngOnInit() {
  }

  removeMe(index) {
    this.compInteraction.removeNode(index);
  }

  createNext(index: number, selection: string) {
    this.selection = selection;
    this.compInteraction.createNext(index);
  }

  onStop(event) {
    moveTo(event.xPosition, event.yPosition);
  }

  moveTo(posX: number, posY: number) {
    this.position = { x: posX, y: posY };
  }

  getPosition() {
    return this.position;
  }
  getType() {
    return this.selection;
  }
}
