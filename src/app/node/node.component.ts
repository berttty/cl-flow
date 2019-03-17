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
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import {Operator} from '../rheem-class/Operator';
import {OptionNext} from '../rheem-class/OptionNext';
import {TextFileSource} from '../rheem-class/source-operator/TextFileSource';

library.add(faBars, faCoins, faHammer, faBrain, faPuzzlePiece, faBullseye, faChild, faTrashAlt, faCogs, faCog);

type MyArrayType = Array<{id: string}>;

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
  private operator: Operator;
  public nextOpt: OptionNext;
  public dobleClose: boolean[];
  private indexOption: number;
  // interface for Parent-Child interaction
  public compInteraction: NodeInterface;

  public position: {x: number, y: number};
  public previous: number;

  public close: boolean;
  public dobleclose1: boolean;
  public dobleclose2: boolean;
  public dobleclose3: boolean;
  public dobleclose4: boolean;
  public dobleclose5: boolean;



  public lines: MyArrayType = [];

  constructor() {
    this.indexOption = 0;
    this.operator = new TextFileSource('');
  }

  ngOnInit() {
    this.close = false;
    this.operator = new TextFileSource('');
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

  onStop(event) {
    console.log('the position is: ' + this.position.x + '  ' + this.position.y);
    console.log('the position will be is: ' + event.x + '  ' + event.y);
    this.moveTo(event.x, event.y);
    console.log('the position after is: ' + this.position.x + '  ' + this.position.y);
  }

  moveTo(posX: number, posY: number) {
    console.log('over the node + ' + this.index);
    this.position = { x: posX, y: posY };
  }

  getPosition() {
    console.log('my index + ' + this.index);
    console.log('my position + ' + this.position);
    return this.position;
  }
  getType() {
    return this.selection;
  }

  checkMe() {
    console.log('toggle: ' + this.close);
    this.close = !this.close;

    if (this.close ===  false) {
      this.dobleClose[1] = false;
      this.dobleClose[2] = false;
      this.dobleClose[3] = false;
      this.dobleClose[4] = false;
      this.dobleClose[5] = false;
    }
  }

  checkMeDetail(index) {
    this.dobleClose[index] = ! this.dobleClose[index];
  }

  setOperator(operator: Operator): void {
    this.operator = operator;
    this.nextOpt = this.operator.nextOption();
    this.dobleClose = [];
    this.dobleClose.push(false);
    this.dobleClose.push(false);
    this.dobleClose.push(false);
    this.dobleClose.push(false);
    this.dobleClose.push(false);
  }

  updateDobleClose(index: number) {
    return this.dobleClose[index];
  }
}
