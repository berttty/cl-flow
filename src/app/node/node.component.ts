import {Component, ComponentRef, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBrain,
  faBullseye,
  faChild,
  faCog,
  faCogs,
  faCoins,
  faHammer,
  faPuzzlePiece,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

import {Operator} from '../rheem-class/Operator';
import {ActionEnum, OptionNext} from '../rheem-class/OptionNext';
import {NodeModalComponent} from '../node-modal/node-modal.component';
import {ModalBroadcastComponent} from '../modal-broadcast/modal-broadcast.component';

import {LineComponent} from '../line/line.component';
import {DrawZoneComponent} from '../draw-zone/draw-zone.component';

library.add(faBars, faCoins, faHammer, faBrain, faPuzzlePiece, faBullseye, faChild, faTrashAlt, faCogs, faCog);


export interface NodeInterface {
  removeNode(index: number);
  createNext(index: number);
  removeEdges(index: number);
  repareEdges(index: number, x, y, oldX, oldY);
  closeAllNodes();
  DrawBroadLine(ori, des);
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
  public confNextOperator: any;
  public selfConfOperator: any;
  // interface for Parent-Child interaction
  public compInteraction: NodeInterface;

  public position: {x: number, y: number};
  public previous: number;

  public close: boolean;
  public movement: boolean;

  public lines: number [];
  public lineListReference = [];
  public broadLinesReference = [];

  public predecessorNodesList = [];
  public successorNodesList = [];
  public editor: DrawZoneComponent;

  constructor(public dialog: MatDialog) {
    this.lines = [];
    this.lineListReference = [];
    this.indexOption = 0;

    this.predecessorNodesList = [];
    this.successorNodesList = [];
  }

  ngOnInit() {
    this.close = false;
    this.movement = false;
  }

  removeMe(index) {
    this.compInteraction.removeNode(index);
  }

  createNext(index: number, selection: string, confNextOperator?: any) {
    this.selection = selection;
    this.confNextOperator = confNextOperator;
    this.compInteraction.createNext(index);
    // WE MUST DISAPPEAR THE OPTIONS FOR SELECT CREATION
    // The options are only css
    this.checkMe();
    this.confNextOperator = null;
  }

  onMoving(event) {

    console.log('movimiento detectado');
    if (this.movement === false) {
    // lista con otros nodos;
      this.compInteraction.removeEdges(this.index);
      this.movement = true;

      this.compInteraction.closeAllNodes();


      // TEST
      /*this.close = true;
      this.checkMe();*/
    }
  }

  onStop(event) {
    this.compInteraction.repareEdges(this.index, event.x, event.y, this.position.x, this.position.y);
  }

  moveTo(posX: number, posY: number) {
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

  checkMe(): void {

    this.close = !this.close;

    if (this.close ===  false) {
      this.dobleClose[1] = false;
      this.dobleClose[2] = false;
      this.dobleClose[3] = false;
      this.dobleClose[4] = false;
      this.dobleClose[5] = false;
    }
  }

  checkMeDetail(index): void {
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

  updateDobleClose(index: number): boolean {
    return this.dobleClose[index];
  }

  doAction(action: ActionEnum, actionOption: any): void {
    switch (action) {
      case ActionEnum.SETTINGS:
        console.log('open the console please');
        this.openDialog();
        break;
      case ActionEnum.DELETE:
        this.removeMe(this.index);
        break;
      case ActionEnum.BROADCAST:
        this.openBroadcast();
        break;
      case ActionEnum.CREATE_NEW:
        if ( ! this.validateObject(actionOption, 'icon', 'MetaOperator', 'TypeOperator')) {
          console.error('We need add option in create');
          break;
        }
        this.createNext(this.index, actionOption.icon, actionOption);
        break;
      default:
        console.log('Somethings is wrong');
        break;
    }
  }

  openDialog(): void {
    this.selfConfOperator.operator = this.operator;
    console.log(this.selfConfOperator);
    const dialogRef = this.dialog.open(NodeModalComponent, {width: '800px', data: this.selfConfOperator});
    dialogRef.afterClosed().subscribe( result => {
      this.operator = result.operator;
      if ( result !== undefined ) {
        console.log(result);
        this.operator = result.operator;
        this.getOperator().addValueConfParameters(result);
        if ( result.outputClass !== undefined ) {
          this.operator.setClassOutput(result.outputClass);
        }
      }
    });
  }

  openBroadcast(): void {
    // this.selfConfOperator.operator = this.operator;
    // this.editor.nodeListReference;

    let i: number;
    const nodesListObj = [];
    for (i = 0; i < this.editor.nodeListReference.length; i++) {
      const compRefX: ComponentRef<NodeComponent> = this.editor.nodeListReference[i];
      const compX: NodeComponent = compRefX.instance as NodeComponent;

      if (compX !== this) {
        nodesListObj.push(compX);
      }
    }

    const dialogRef = this.dialog.open(ModalBroadcastComponent, {width: '800px', data: {nodesList: nodesListObj, currentNode: this}});
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);

      this.compInteraction.DrawBroadLine(this, result);
      /*Ahora debemos dibujar la linea*/
      /*this.operator = result.operator;
      if ( result !== undefined ) {
        console.log(result);
        this.operator = result.operator;
        this.getOperator().addValueConfParameters(result);
        if ( result.outputClass !== undefined ) {
          this.operator.setClassOutput(result.outputClass);
        }
      }*/
    });
  }

  private validateObject(obj: any, ...option: string[]): boolean {
    const test = Object.keys(obj);
    return option
              .filter((ele: string) => {
                  return ! test.includes(ele);
              })
          .length === 0 ;
  }

  public getOperator(): Operator {
    return this.operator;
  }
}
