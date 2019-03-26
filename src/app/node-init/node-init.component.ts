import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHdd } from '@fortawesome/free-solid-svg-icons';
import {Operator} from '../rheem-class/Operator';
import {OperatorFactory} from '../rheem-class/factory/OperatorFactory';

library.add(faQuestion, faCoins, faHdd);

export interface NodeInitInterface {
  removeNodeInit(index: number, operator?: Operator, configuration?: any);
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

  private nextIcon: string;

  constructor() {}

  ngOnInit() {}

  setSource(index: number, platform: string) {
    const conf: any = OperatorFactory.getConfigurationSource(platform);
    const op: Operator = OperatorFactory.buildOperator(conf);
    switch (platform) {
      case 'HDFS':
        this.nextIcon = 'hdfs';
        break;
      case 'LFS':
        this.nextIcon = 'hdd';
        break;
      case 'PostgreSQL':
        this.nextIcon = 'postgresql';
        break;
      default:
        this.nextIcon = 'coins';
        break;
    }
    this.compInteraction.removeNodeInit(index, op, conf);
  }

  onStop(event) {
    // console.log('the position is: ' + this.position.x + '  ' + this.position.y);
    this.moveTo(event.x, event.y);
  }

  moveTo(posX: number, posY: number) {
    this.position = { x: posX, y: posY };
  }

  getPosition() {
    return this.position;
  }

  getType() {
    return this.nextIcon;
  }
}
