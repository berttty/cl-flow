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
import {LineComponent} from '../line/line.component';

library.add(faBars, faCoins, faHammer, faBrain, faPuzzlePiece, faBullseye, faChild, faTrashAlt);

export interface NodeInterface {
  removeNode(index: number);
  createNext(index: number);
  removeEdges(index: number);
  repareEdges(index: number, x, y);
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
  public previous: number;

  public close: boolean;
  public movement: boolean;
  public dobleclose1: boolean;
  public dobleclose2: boolean;
  public dobleclose3: boolean;
  public dobleclose4: boolean;
  public dobleclose5: boolean;



  public lines: number [];
  public lineListReference = [];

  constructor() {
    this.lines = [];
    this.lineListReference = [];
  }

  ngOnInit() {
    this.close = false;
    this.movement = false;

  }

  removeMe(index) {
    this.compInteraction.removeNode(index);
  }

  createNext(index: number, selection: string) {
    this.selection = selection;
    this.compInteraction.createNext(index);

    // WE MUST DISSAPEAR THE OPTIONS FOR SELECT CREATION
    // The options are only css

    this.checkMe();

  }

  onMoving(event) {

    console.log('movimiento detectado');
    if (this.movement === false) {
    // lista con otros nodos;
      this.compInteraction.removeEdges(this.index);
      this.movement = true;
    }
  }

  onStop(event) {
    // console.log('the position is: ' + this.position.x + '  ' + this.position.y);
    // console.log('the position will be is: ' + event.x + '  ' + event.y);
    this.moveTo(event.x, event.y);
    // console.log('the position after is: ' + this.position.x + '  ' + this.position.y);
    this.compInteraction.repareEdges(this.index, event.x, event.y);
  }

  moveTo(posX: number, posY: number) {
    // console.log('over the node + ' + this.index);
    this.position = { x: posX, y: posY };
  }

  getPosition() {
    // console.log('my index + ' + this.index);
    // console.log('my position + ' + this.position);
    return this.position;
  }
  getType() {
    return this.selection;
  }

  checkMe() {
    // console.log('toggle: ' + this.close)
    this.close = !this.close;

    if (this.close ===  false) {
      this.dobleclose1 = false;
      this.dobleclose2 = false;
      this.dobleclose3 = false;
      this.dobleclose4 = false;
      this.dobleclose5 = false;
    }
  }

  checkMeDetail(op) {
    if (op === 1) {
      this.dobleclose1 = !this.dobleclose1;
    } else if (op === 2) {
      this.dobleclose2 = !this.dobleclose2;
    } else if (op === 3) {
      this.dobleclose3 = !this.dobleclose3;
    } else if (op === 4) {
      this.dobleclose4 = !this.dobleclose4;
    } else if (op === 5) {
      this.dobleclose5 = !this.dobleclose5;
    }
  }
}
